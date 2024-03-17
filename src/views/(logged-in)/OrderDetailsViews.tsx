import OrderDetails from '@/components/pages/order-details/order-details';
import { useGetOrderByCodeQuery } from '@/services/redux/features/orders';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetailsViews = () => {
  const { t } = useTranslation('translation');
  const { code } = useParams();
  const navigate = useNavigate();
  const {
    data: orderData,
    isSuccess: isSuccessOrder,
    isError: isErrorOrder,
  } = useGetOrderByCodeQuery(code);
  if (isErrorOrder) {
    navigate('/Not-Found', { replace: true });
  }
  return (
    <>
      <h2 className='text-lg font-bold'>{t('invoice')}</h2>
      {isSuccessOrder && <OrderDetails order={orderData} />}
    </>
  );
};

export default OrderDetailsViews;
