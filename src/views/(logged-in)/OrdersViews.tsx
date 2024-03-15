import { useCallback, useMemo, useState } from 'react';
import Table from '@/components/(ui)/table/table';
import FilterOrders from '@/components/pages/orders/filter_orders';
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from '@/services/redux/features/orders';
import { status } from '@/services/redux/slice/statusSlice';
import { formatTime } from '@/services/utils/format';
import { Order } from '@/types/type';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSearchPlus } from 'react-icons/fa';
import NotFoundOrders from '@/components/(ui)/not-found-orders/not_found_orders';
import { useTranslation } from 'react-i18next';

type HandleFilterFunction = (
  search: string,
  currStatus: string,
  ordersLimit: number | string,
  method: string,
  startDate: string,
  endDate: string
) => void;
const OrdersViews = () => {
  const { t, i18n } = useTranslation('translation');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const [currStatus, setCurrStatus] = useState<string>('');
  const [ordersLimit, setOrdersLimit] = useState<number | string>('');
  const [method, setMethod] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const allStatus = useSelector(status);
  const { data: ordersData, isSuccess: isSuccessOrders } = useGetOrdersQuery(
    `page=${page}&search=${search}&status=${currStatus}&orders_limit=${ordersLimit}&method=${method}&start_date=${startDate}&end_date=${endDate}`
  );
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
            <td className='p-4'>{o.paymentInfo.user_name}</td>
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
            <td className='p-4'>
              <button
                className='m-auto text-lg flex justify-center items-center hover:text-green transition-colors'
                aria-label='show'
                onClick={() => navigate(`/orders/${o.paymentInfo.orderCode}`)}
              >
                <FaSearchPlus />
              </button>
            </td>
          </tr>
        );
      })
    );
  }, [isSuccessOrders, ordersData, i18n.language]);
  const handleFilter: HandleFilterFunction = (
    search,
    status,
    ordersLimit,
    method,
    startDate,
    endDate
  ) => {
    setSearch(search);
    setCurrStatus(status);
    setOrdersLimit(ordersLimit);
    setMethod(method);
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const handleChangePage = (p: number) => {
    setPage(p);
  };
  return (
    <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <h2 className='text-lg font-bold'>{t('orders')}</h2>
      <FilterOrders handleFilter={handleFilter} />
      <section className='flex flex-col gap-[40px] pb-16'>
        {isSuccessOrders && ordersData.orders.length > 0 && (
          <Table
            tHeader={[
              `${t('invoice_no')}`,
              `${t('order_time')}`,
              `${t('customer_name')}`,
              `${t('method')}`,
              `${t('amount')}`,
              `${t('status')}`,
              `${t('action')}`,
              `${t('invoice')}`,
            ]}
            renderedData={renderedOrders}
            totalPage={ordersData.totalPage}
            handleChangePage={handleChangePage}
          />
        )}
        {isSuccessOrders && ordersData.orders.length === 0 && (
          <NotFoundOrders message={t('message_no_order')} />
        )}
      </section>
    </main>
  );
};

export default OrdersViews;
