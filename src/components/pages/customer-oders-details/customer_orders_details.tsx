import { useUpdateOrderMutation } from '@/services/redux/features/orders';
import { status } from '@/services/redux/slice/statusSlice';
import { formatTime } from '@/services/utils/format';
import { Order } from '@/types/type';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
type Props = {
  order: Order;
};
const CustomerOrdersDetails: React.FC<Props> = ({ order }) => {
  const { t, i18n } = useTranslation('translation');
  const { paymentMethod, paymentInfo, created_at, user } = order;
  const [updateOrder, { isSuccess: isSuccessUpdateOrder }] =
    useUpdateOrderMutation();
  const allStatus = useSelector(status);
  const currStatus = useMemo(() => {
    return allStatus?.find((s) => s.name === paymentInfo.status);
  }, []);
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
  return (
    <tr className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{paymentInfo.orderCode}</td>
      <td className='p-4'>{formatTime(created_at, i18n.language)}</td>
      <td className='p-4'>{paymentInfo.address}</td>
      <td className='p-4'>{paymentInfo.phone}</td>
      <td className='p-4 capitalize'>{t(`${paymentMethod}`)}</td>
      <td className='p-4'>{paymentInfo.totalPrice} VND</td>
      <td className='p-4'>
        <p
          className='w-max m-auto px-3 rounded-[26px] capitalize'
          style={{
            backgroundColor: currStatus?.backgroundColor,
            color: currStatus?.color,
          }}
        >
          {t(`${paymentInfo.status}`)}
        </p>
      </td>
      <td className='p-4'>
        <select
          className={`capitalize font-medium px-2 py-1 max-w-[172px] w-full bg-lightGray text-darkGray dark:bg-darkGray dark:text-lightGray rounded ${
            paymentInfo.status !== 'pending'
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          onChange={handleChangeStatus}
          data-id={paymentInfo.orderCode}
          data-user={user}
          disabled={paymentInfo.status !== 'pending'}
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
};

export default CustomerOrdersDetails;
