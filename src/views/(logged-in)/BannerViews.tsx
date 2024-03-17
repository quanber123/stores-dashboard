import { useTranslation } from 'react-i18next';

const BannerViews = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <h2 className='text-lg font-bold'>{t('banners')}</h2>
    </>
  );
};

export default BannerViews;
