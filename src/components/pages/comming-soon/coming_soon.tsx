import comingSoonImg from '@/assets/progress-5vs5qa6i.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const ComingSoon = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  return (
    <div className='my-8 w-full flex justify-items-center items-center flex-col gap-[40px]'>
      <div className='m-auto max-w-[650px] max-h-[420px]'>
        <img
          className='w-full h-full'
          src={comingSoonImg}
          alt='comingSoonImg'
        />
      </div>
      <p className='text-2xl md:text-4xl font-bold text-center'>
        {t('coming_soon')}
      </p>
      <button
        className='mx-auto py-3 px-8 rounded-md max-w-max bg-lightGreen hover:bg-darkGreen transition-colors font-bold'
        onClick={() => navigate('/dashboard', { replace: true })}
      >
        {t('back_to_home')}
      </button>
    </div>
  );
};

export default ComingSoon;
