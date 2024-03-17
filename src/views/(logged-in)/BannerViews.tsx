import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
import Table from '@/components/(ui)/table/table';
import AddBannerModal from '@/components/modal/add_banner_modal';
import { ModalContext } from '@/components/modal/context/modalContext';
import Banners from '@/components/pages/banners/banners';
import { useGetBannersQuery } from '@/services/redux/features/products';
import { Banner } from '@/types/type';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa6';
const BannerViews = () => {
  const { t, i18n } = useTranslation('translation');
  const { setVisibleModal } = useContext(ModalContext);
  const { data: bannersData, isSuccess: isSuccessBanners } =
    useGetBannersQuery(null);
  const renderedBanners = useMemo(() => {
    return (
      isSuccessBanners &&
      bannersData?.map((b: Banner) => {
        return <Banners key={b._id} banner={b} />;
      })
    );
  }, [isSuccessBanners, bannersData, i18n.language]);
  return (
    <>
      <AddBannerModal />
      <div className='grid grid-cols-2'>
        <h2 className='text-lg font-bold'>{t('banners')}</h2>
        <button
          className='ml-auto w-[192px] h-[48px] rounded-md text-white bg-lightGreen hover:bg-darkGreen transition-colors flex justify-center items-center gap-[10px] focus:outline-none'
          onClick={() => setVisibleModal('visibleAddBannerModal')}
        >
          <FaPlus /> {t('add_banner')}
        </button>
      </div>
      {isSuccessBanners && bannersData.length > 0 && (
        <Table
          tHeader={[
            `ID`,
            `${t('img')}`,
            `${t('content')}`,
            `${t('sub_content')}`,
            `${t('category')}`,
            `${t('action')}`,
          ]}
          renderedData={renderedBanners}
        />
      )}
      {isSuccessBanners && bannersData.length === 0 && (
        <NotFoundItem message={t('message_no_banners')} />
      )}
    </>
  );
};

export default BannerViews;
