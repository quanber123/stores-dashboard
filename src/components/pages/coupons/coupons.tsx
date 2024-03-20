import { ModalContext } from '@/components/modal/context/modalContext';
import { useDeleteCouponsMutation } from '@/services/redux/features/products';
import { formatDate } from '@/services/utils/format';
import { Coupon } from '@/types/type';
import React, { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrashCan } from 'react-icons/fa6';
type Props = {
  coupon: Coupon;
};
const Coupons: React.FC<Props> = ({ coupon }) => {
  const { t, i18n } = useTranslation('translation');
  const { id, image, name, discount, startDate, endDate, expired } = coupon;
  const { setVisibleModal } = useContext(ModalContext);
  const [
    deleteCoupons,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDelete },
  ] = useDeleteCouponsMutation();
  const handleRemoveCoupon = useCallback(
    (c: Coupon) => {
      setVisibleModal({
        visibleAlertModal: {
          icon: <FaTrashCan className='text-red' />,
          question: (
            <p className='text-lg font-bold'>
              {t('mess_del')} <span className='text-red'>{c.name}</span> ?
            </p>
          ),
          description: `${t('des_del')}`,
          messCancel: `${t('mess_cancel')}`,
          messAccept: `${t('mess_accept_del')}`,
          acceptFunc: () => deleteCoupons(id),
          loading: isLoadingDelete,
        },
      });
    },
    [coupon]
  );
  useEffect(() => {
    if (isSuccessDelete) {
      setVisibleModal('visibleAlertModal');
    }
  }, [isSuccessDelete]);
  return (
    <tr className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{id}</td>
      <td className='p-4 flex justify-center items-center gap-[20px]'>
        <div className='bg-white w-[32px] h-[32px] border-2 border-white rounded-full overflow-hidden'>
          <img className='w-full h-full' src={image} alt={name} />
        </div>
        <p>{name}</p>
      </td>
      <td className='p-4'>{discount}%</td>
      <td className='p-4'>{formatDate(startDate, i18n.language)}</td>
      <td className='p-4'>{formatDate(endDate, i18n.language)}</td>
      <td className='p-4 text-[#fff] text-[12px]'>
        <p
          className={`m-auto capitalize w-max px-2 rounded-2xl ${
            expired ? 'bg-red' : 'bg-green'
          }`}
        >
          {expired ? t('expired') : t('active')}
        </p>
      </td>
      <td className='p-4'>
        <div className='flex justify-center items-center gap-[16px]'>
          {/* <button
            className='text-lg flex justify-center items-center hover:text-green transition-colors'
            aria-label='update-coupon'
          >
            <FaRegPenToSquare />
          </button> */}
          <button
            className='text-lg flex justify-center items-center hover:text-red transition-colors'
            aria-label='remove-coupon'
            onClick={() => handleRemoveCoupon(coupon)}
          >
            <FaTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Coupons;
