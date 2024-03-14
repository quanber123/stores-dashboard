import OrderDetails from '@/components/pages/order-details/order-details';
import { useGetOrderByCodeQuery } from '@/services/redux/features/orders';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetailsViews = () => {
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
    <main className='w-full h-full xl:ml-[256px] mt-[64px] py-8 px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <h2 className='text-lg font-bold'>Invoice</h2>
      {isSuccessOrder && <OrderDetails order={orderData} />}
    </main>
  );
};

export default OrderDetailsViews;
