import Table from '@/components/(ui)/table/table';
import { useGetCouponsQuery } from '@/services/redux/features/products';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa6';
import { Coupon } from '@/types/type';
import AddCouponModal from '@/components/modal/add_coupon_modal';
import { ModalContext } from '@/components/modal/context/modalContext';
import Coupons from '@/components/pages/coupons/coupons';
import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
const CouponsViews = () => {
  const { t, i18n } = useTranslation('translation');
  const { setVisibleModal } = useContext(ModalContext);
  const [page, setPage] = useState(1);
  const { data: couponsData, isSuccess: isSuccessCoupons } = useGetCouponsQuery(
    `page=${page}`
  );
  const renderedCoupons = useMemo(() => {
    return (
      isSuccessCoupons &&
      couponsData?.coupons?.map((c: Coupon) => {
        return <Coupons key={c._id} coupon={c} />;
      })
    );
  }, [isSuccessCoupons, couponsData, i18n.language]);
  const handlePageChange = (p: number) => {
    setPage(p);
  };
  return (
    <>
      <AddCouponModal />
      <div className='grid grid-cols-2'>
        <h2 className='text-lg font-bold'>{t('coupons')}</h2>
        <button
          className='ml-auto w-[192px] h-[36px] md:h-[48px] rounded-md text-white bg-lightGreen hover:bg-darkGreen transition-colors flex justify-center items-center gap-[10px] focus:outline-none'
          onClick={() => setVisibleModal('visibleAddCouponModal')}
        >
          <FaPlus /> {t('add_coupon')}
        </button>
      </div>
      {isSuccessCoupons && couponsData.coupons.length > 0 && (
        <Table
          tHeader={[
            `ID`,
            `${t('campaign_name')}`,
            `${t('discount')}`,
            `${t('start_date')}`,
            `${t('end_date')}`,
            `${t('status')}`,
            `${t('action')}`,
          ]}
          renderedData={renderedCoupons}
          handlePageChange={handlePageChange}
          totalPage={couponsData.totalPage}
        />
      )}
      {isSuccessCoupons && couponsData.coupons.length === 0 && (
        <NotFoundItem message={t('message_no_coupons')} />
      )}
    </>
  );
};

export default CouponsViews;
