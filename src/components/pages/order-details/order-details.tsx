import { status } from '@/services/redux/slice/statusSlice';
import { formatDate } from '@/services/utils/format';
import { Order } from '@/types/type';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
type Props = {
  order: Order;
};
const OrderDetails: React.FC<Props> = ({ order }) => {
  const allStatus = useSelector(status);
  const currStatus = useMemo(() => {
    return allStatus.find((s) => s.name === order.paymentInfo.status);
  }, [order]);
  return (
    <section className='p-8 text-darkGray dark:text-gray bg-white dark:bg-darkGray rounded-lg text-sm flex flex-col gap-[24px] overflow-y-auto'>
      <div className='pt-[16px] pb-[32px] font-bold flex flex-col gap-2 border-b border-lightGray'>
        <p className='uppercase text-xl text-white'>Invoice</p>
        <div className='flex items-center gap-[20px]'>
          <p className='uppercase'>Status</p>
          <p
            className='px-2 rounded-xl text-sm font-bold capitalize'
            style={{
              backgroundColor: currStatus?.backgroundColor,
              color: currStatus?.color,
            }}
          >
            {order.paymentInfo.status}
          </p>
        </div>
      </div>
      <div className='grid md:grid-cols-3 grid-cols-1'>
        <div>
          <p className='font-bold uppercase'>DATE</p>
          <p>{formatDate(order.created_at)}</p>
        </div>
        <div className='md:mx-auto flex flex-col'>
          <p className='font-bold uppercase'>Invoice No</p>
          <p>#{order.paymentInfo.orderCode}</p>
        </div>
        <div className='flex flex-col md:items-end'>
          <p className='font-bold uppercase'>Invoice To</p>
          <div className='md:text-end'>
            <p>{order.paymentInfo.user_name}</p>
            <p>{order.paymentInfo.message}</p>
            <p>{order.paymentInfo.phone}</p>
            <p>{order.paymentInfo.address}</p>
          </div>
        </div>
      </div>
      <div className='w-full rounded-lg border border-lightGray dark:border-gray overflow-x-auto'>
        <table className='w-full whitespace-nowrap overflow-y-auto'>
          <thead className='text-xs font-semibold tracking-wide text-left text-gray uppercase border-b border-lightGray dark:border-gray dark:text-gray dark:bg-darkGray'>
            <tr className='text-center font-bold'>
              <td className='px-4 py-2'>SR.</td>
              <td className='px-4 py-2'>PRODUCT TITLE</td>
              <td className='px-4 py-2'>QUANTITY</td>
              <td className='px-4 py-2'>ITEM PRICE</td>
              <td className='px-4 py-2'>AMOUNT</td>
            </tr>
          </thead>
          <tbody>
            {order.paymentInfo.products?.map((p: any) => {
              return (
                <tr className='font-bold' key={p._id}>
                  <td className='p-4 text-center'>{p._id}</td>
                  <td className='p-4 text-center text-white'>{p.name}</td>
                  <td className='p-4 text-center'>{p.quantity}</td>
                  <td className='p-4 text-center'>{p.price} VND</td>
                  <td className='p-4 text-center'>{p.totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='bg-[#fff] dark:bg-darkBlue px-2 py-8 rounded-lg grid md:grid-cols-4 grid-cols-1 gap-[20px] font-bold'>
        <div className='md:mx-auto flex flex-col gap-[8px]'>
          <p className='uppercase text-base'>payment method</p>
          <p className='capitalize'>{order.paymentMethod}</p>
        </div>
        <div className='md:mx-auto flex flex-col gap-[8px]'>
          <p className='uppercase text-base'>shipping cost</p>
          <p>0 VND</p>
        </div>
        <div className='md:mx-auto flex flex-col gap-[8px]'>
          <p className='uppercase text-base'>discount</p>
          <p>{order.paymentInfo.totalSalePrice} VND</p>
        </div>
        <div className='md:mx-auto flex flex-col gap-[8px]'>
          <p className='uppercase text-base'>total amount</p>
          <p className='text-lg text-lightGreen'>
            {order.paymentInfo.totalPrice} VND
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
