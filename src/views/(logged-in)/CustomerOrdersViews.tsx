import NotFoundOrders from '@/components/(ui)/not-found-orders/not_found_orders';
import Table from '@/components/(ui)/table/table';
import {
  useGetAllOrdersByUserIdQuery,
  useUpdateOrderMutation,
} from '@/services/redux/features/orders';
import { status } from '@/services/redux/slice/statusSlice';
import { formatTime } from '@/services/utils/format';
import { Order } from '@/types/type';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CustomerOrdersViews = () => {
  const { t, i18n } = useTranslation('translation');
  const { id } = useParams();
  const allStatus = useSelector(status);
  const [currPage, setCurrPage] = useState(1);
  const { data: ordersData, isSuccess: isSuccessOrders } =
    useGetAllOrdersByUserIdQuery({ id: id, page: currPage });
  const [updateOrder, { isSuccess: isSuccessUpdateOrder }] =
    useUpdateOrderMutation();
  const handleChangeStatus = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const order_code = Number(e.target.getAttribute('data-id'));
      const order_user = e.target.getAttribute('data-user');
      const status = e.target.value;
      await updateOrder({
        orderId: order_code,
        status: status,
        userId: order_user,
      });
    },
    [isSuccessUpdateOrder]
  );
  const handleChangePage = useCallback(
    (page: number) => {
      setCurrPage(page);
    },
    [currPage]
  );
  const renderedOrders = useMemo(() => {
    return (
      isSuccessOrders &&
      ordersData?.orders?.map((o: Order) => {
        const currStatus = allStatus?.find(
          (s) => s.name === o.paymentInfo.status
        );
        return (
          <tr
            className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'
            key={o._id}
          >
            <td className='p-4'>{o.paymentInfo.orderCode}</td>
            <td className='p-4'>{formatTime(o.created_at, i18n.language)}</td>
            <td className='p-4'>{o.paymentInfo.address}</td>
            <td className='p-4'>{o.paymentInfo.phone}</td>
            <td className='p-4 capitalize'>{t(`${o.paymentMethod}`)}</td>
            <td className='p-4'>{o.paymentInfo.totalPrice} VND</td>
            <td className='p-4'>
              <p
                className='w-max m-auto px-3 rounded-[26px] capitalize'
                style={{
                  backgroundColor: currStatus?.backgroundColor,
                  color: currStatus?.color,
                }}
              >
                {t(`${o.paymentInfo.status}`)}
              </p>
            </td>
            <td className='p-4'>
              <select
                className={`capitalize font-medium px-2 py-1 max-w-[172px] w-full bg-lightGray text-darkGray dark:bg-darkGray dark:text-lightGray rounded ${
                  o.paymentInfo.status !== 'pending'
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onChange={handleChangeStatus}
                data-id={o.paymentInfo.orderCode}
                data-user={o.user}
                disabled={o.paymentInfo.status !== 'pending'}
              >
                {allStatus.map((s) => (
                  <option
                    key={s._id}
                    value={s.name}
                    disabled={s.name !== 'processing' && s.name !== 'pending'}
                  >
                    {t(`${s.name}`)}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        );
      })
    );
  }, [ordersData, isSuccessOrders, i18n.language]);
  return (
    <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <h2 className='text-lg font-bold'>{t('customer_order_list')}</h2>
      {isSuccessOrders && ordersData.orders.length > 0 && (
        <Table
          tHeader={[
            `${t('invoice_no')}`,
            `${t('order_time')}`,
            `${t('shipping_address')}`,
            `${t('phone')}`,
            `${t('method')}`,
            `${t('amount')}`,
            `${t('status')}`,
            `${t('action')}`,
          ]}
          renderedData={renderedOrders}
          handleChangePage={handleChangePage}
          totalPage={ordersData.totalPage}
        />
      )}
      {isSuccessOrders && ordersData.orders.length === 0 && (
        <NotFoundOrders message={t('message_customer_no_order')} />
      )}
    </main>
  );
};

export default CustomerOrdersViews;
