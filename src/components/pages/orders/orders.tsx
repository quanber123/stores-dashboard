import { useUpdateOrderMutation } from '@/services/redux/features/orders';
import { status } from '@/services/redux/slice/statusSlice';
import { formatTime } from '@/services/utils/format';
import { Order } from '@/types/type';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSearchPlus } from 'react-icons/fa';
type Props = {
  order: Order;
};
const Orders: React.FC<Props> = ({ order }) => {
  const { t, i18n } = useTranslation('translation');
  const navigate = useNavigate();
  const { paymentMethod, paymentInfo, created_at, user } = order;
  const [updateOrder, { isSuccess: isSuccessUpdateOrder }] =
    useUpdateOrderMutation();
  const allStatus = useSelector(status);
  const currStatus = useMemo(() => {
    return allStatus?.find((s) => s.name === paymentInfo.status);
  }, [order]);
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
      <td className='p-4'>{paymentInfo.user_name}</td>
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
      <td className='p-4'>
        <button
          className='m-auto text-lg flex justify-center items-center hover:text-green transition-colors'
          aria-label='show'
          onClick={() => navigate(`/orders/${paymentInfo.orderCode}`)}
        >
          <FaSearchPlus />
        </button>
      </td>
    </tr>
  );
};

export default Orders;
