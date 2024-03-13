import Table from '@/components/(ui)/table/table';
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from '@/services/redux/features/orders';
import { status } from '@/services/redux/slice/statusSlice';
import { formatTime } from '@/services/utils/format';
import { Order } from '@/types/type';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const RecentOrder = () => {
  const allStatus = useSelector(status);
  const [currPage, setCurrPage] = useState(1);
  const { data: ordersData, isSuccess: isSuccessOrders } = useGetOrdersQuery(
    `page=${currPage}`
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
  const handleChangePage = useCallback(
    (page: number) => {
      setCurrPage(page);
    },
    [currPage]
  );
  const renderedOrders = useMemo(() => {
    return ordersData?.orders?.map((o: Order) => {
      const currStatus = allStatus?.find(
        (s) => s.name === o.paymentInfo.status
      );
      return (
        <tr
          className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'
          key={o._id}
        >
          <td className='py-2'>{o.paymentInfo.orderCode}</td>
          <td className='py-2'>{formatTime(o.created_at)}</td>
          <td className='py-2'>{o.paymentInfo.user_name}</td>
          <td className='py-2 capitalize'>{o.paymentMethod}</td>
          <td className='py-2'>{o.paymentInfo.totalPrice} VND</td>
          <td className='py-2'>
            <p
              className='w-max m-auto px-3 rounded-[26px] capitalize'
              style={{
                backgroundColor: currStatus?.backgroundColor,
                color: currStatus?.color,
              }}
            >
              {o.paymentInfo.status}
            </p>
          </td>
          <td className='py-2'>
            <select
              className={`capitalize font-medium px-2 py-1 max-w-[172px] w-full bg-lightGray text-darkGray dark:bg-darkGray dark:text-lightGray ${
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
                  {s.name}
                </option>
              ))}
            </select>
          </td>
          <td className='py-2'>Invoice</td>
        </tr>
      );
    });
  }, [ordersData, isSuccessOrders]);
  return (
    <section className='py-16 flex flex-col gap-[20px]'>
      <h2 className='text-lg font-bold'>Recent Order</h2>
      {isSuccessOrders && (
        <Table
          tHeader={[
            'INVOICE NO',
            'ORDER TIME',
            'CUSTOMER NAME',
            'METHOD',
            'AMOUNT',
            'STATUS',
            'ACTION',
            'INVOICE',
          ]}
          totalPage={ordersData.totalPage}
          renderedData={renderedOrders}
          handleChangePage={handleChangePage}
        />
      )}
    </section>
  );
};

export default RecentOrder;
