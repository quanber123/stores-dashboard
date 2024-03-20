import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
import Table from '@/components/(ui)/table/table';
import CustomerOrdersDetails from '@/components/pages/customer-oders-details/customer_orders_details';
import { useGetAllOrdersByUserIdQuery } from '@/services/redux/features/orders';
import { Order } from '@/types/type';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
const CustomerOrdersViews = () => {
  const { t, i18n } = useTranslation('translation');
  const { id } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const { data: ordersData, isSuccess: isSuccessOrders } =
    useGetAllOrdersByUserIdQuery({ id: id, page: currPage });

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrPage(page);
    },
    [currPage]
  );
  const renderedOrders = useMemo(() => {
    return (
      isSuccessOrders &&
      ordersData?.orders?.map((o: Order) => {
        return <CustomerOrdersDetails key={o._id} order={o} />;
      })
    );
  }, [ordersData, isSuccessOrders, i18n.language]);
  return (
    <>
      <h2 className='text-lg font-bold'>{t('customer_order_list')}</h2>
      {isSuccessOrders && ordersData.orders.length > 0 && (
        <Table
          tHeader={[
            `${t('invoice_no')}`,
            `${t('order_time')}`,
            `${t('shipping_address')}`,
            `${t('phone')}`,
            `${t('method')}`,
            `${t('amount')}`,
            `${t('status')}`,
            `${t('action')}`,
          ]}
          renderedData={renderedOrders}
          handlePageChange={handlePageChange}
          totalPage={ordersData.totalPage}
          currPage={currPage}
        />
      )}
      {isSuccessOrders && ordersData.orders.length === 0 && (
        <NotFoundItem message={t('message_customer_no_order')} />
      )}
    </>
  );
};

export default CustomerOrdersViews;
