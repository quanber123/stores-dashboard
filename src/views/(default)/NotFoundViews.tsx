import notfoundimg from '@/assets/404.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const NotFoundViews = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  return (
    <>
      <div className='mx-auto max-w-[650px] max-h-[450px]'>
        <img className='w-full h-full' src={notfoundimg} alt='not-found' />
      </div>
      <p className='text-2xl md:text-4xl font-bold text-center'>
        {t('not_found_page')}
      </p>
      <button
        className='mx-auto py-3 px-8 rounded-md max-w-[170px] bg-lightGreen hover:bg-darkGreen transition-colors font-bold'
        onClick={() => navigate('/dashboard', { replace: true })}
      >
        {t('back_to_home')}
      </button>
    </>
  );
};

export default NotFoundViews;
