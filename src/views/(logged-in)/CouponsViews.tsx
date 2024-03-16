import Table from '@/components/(ui)/table/table';
import { useGetCouponsQuery } from '@/services/redux/features/products';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa6';
import { Coupon } from '@/types/type';
import { formatTime } from '@/services/utils/format';
import AddCouponModal from '@/components/modal/add_coupon_modal';
import { ModalContext } from '@/components/modal/context/modalContext';
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
        return (
          <tr
            className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'
            key={c._id}
          >
            <td className='p-4'>{c.id}</td>
            <td className='p-4 flex justify-center items-center gap-[20px]'>
              <div className='bg-white w-[32px] h-[32px] border-2 border-white rounded-full overflow-hidden'>
                <img className='w-full h-full' src={c.image} alt={c.name} />
              </div>
              <p>{c.name}</p>
            </td>
            <td className='p-4'>{c.discount}%</td>
            <td className='p-4'>
              <button
                style={{ transition: 'background-color 0.2s linear' }}
                className={`relative w-[30px] h-[15px] rounded-[15px] text-base font-bold text-[#fff] ${
                  c.published ? 'bg-green' : 'bg-red'
                }`}
                aria-label='toggle-published'
              >
                <span
                  style={{
                    transition: 'all 0.2s linear',
                    transform: c.published ? 'translate(175%)' : 'translate(0)',
                  }}
                  className='absolute top-[1px] left-[1px] w-[13px] h-[13px] bg-[#fff] rounded-full'
                ></span>
              </button>
            </td>
            <td className='p-4'>{formatTime(c.startDate, i18n.language)}</td>
            <td className='p-4'>{formatTime(c.endDate, i18n.language)}</td>
            <td className='p-4 text-[#fff] text-[12px]'>
              <p
                className={`m-auto capitalize w-max px-2 rounded-2xl ${
                  c.expired ? 'bg-red' : 'bg-green'
                }`}
              >
                {c.expired ? t('expired') : t('active')}
              </p>
            </td>
            <td className='p-4'>
              <button
                className='m-auto text-lg flex justify-center items-center hover:text-green transition-colors'
                aria-label='show'
                // onClick={() => navigate(`/orders/${o.paymentInfo.orderCode}`)}
              >
                {/* <FaSearchPlus /> */}
              </button>
            </td>
          </tr>
        );
      })
    );
  }, [isSuccessCoupons, couponsData, i18n.language]);
  const handleChangePage = (p: number) => {
    setPage(p);
  };
  return (
    <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <AddCouponModal />
      <div className='grid grid-cols-2'>
        <h2 className='text-lg font-bold'>{t('products')}</h2>
        <button
          className='ml-auto w-[192px] h-[48px] rounded-md text-white bg-lightGreen hover:bg-darkGreen transition-colors flex justify-center items-center gap-[10px] focus:outline-none'
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
            `${t('published')}`,
            `${t('start_date')}`,
            `${t('end_date')}`,
            `${t('status')}`,
            `${t('action')}`,
          ]}
          renderedData={renderedCoupons}
          handleChangePage={handleChangePage}
          totalPage={couponsData.totalPage}
        />
      )}
    </main>
  );
};

export default CouponsViews;
