import { useTranslation } from 'react-i18next';

const ErrValidate = ({ message }: { message: string }) => {
  const { t } = useTranslation('translation');
  return <p className='text-red font-bold'>{t(`${message}`)}</p>;
};

export default ErrValidate;
