import { useMemo, useState } from 'react';
import Table from '@/components/(ui)/table/table';
import FilterOrders from '@/components/pages/orders/filter_orders';
import { useGetOrdersQuery } from '@/services/redux/features/orders';
import { Order } from '@/types/type';
import NotFoundOrders from '@/components/(ui)/not-found-orders/not_found_orders';
import { useTranslation } from 'react-i18next';
import Orders from '@/components/pages/orders/orders';

type HandleFilterFunction = (
  search: string,
  currStatus: string,
  ordersLimit: number | string,
  method: string,
  startDate: string,
  endDate: string
) => void;
const OrdersViews = () => {
  const { t, i18n } = useTranslation('translation');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const [currStatus, setCurrStatus] = useState<string>('');
  const [ordersLimit, setOrdersLimit] = useState<number | string>('');
  const [method, setMethod] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { data: ordersData, isSuccess: isSuccessOrders } = useGetOrdersQuery(
    `page=${page}&search=${search}&status=${currStatus}&orders_limit=${ordersLimit}&method=${method}&start_date=${startDate}&end_date=${endDate}`
  );
  const renderedOrders = useMemo(() => {
    return (
      isSuccessOrders &&
      ordersData?.orders?.map((o: Order) => {
        return <Orders key={o._id} order={o} />;
      })
    );
  }, [isSuccessOrders, ordersData, i18n.language]);
  const handleFilter: HandleFilterFunction = (
    search,
    status,
    ordersLimit,
    method,
    startDate,
    endDate
  ) => {
    setSearch(search);
    setCurrStatus(status);
    setOrdersLimit(ordersLimit);
    setMethod(method);
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const handleChangePage = (p: number) => {
    setPage(p);
  };
  return (
    <>
      <h2 className='text-lg font-bold'>{t('orders')}</h2>
      <FilterOrders handleFilter={handleFilter} />
      <section className='flex flex-col gap-[40px] pb-16'>
        {isSuccessOrders && ordersData.orders.length > 0 && (
          <Table
            tHeader={[
              `${t('invoice_no')}`,
              `${t('order_time')}`,
              `${t('customer_name')}`,
              `${t('method')}`,
              `${t('amount')}`,
              `${t('status')}`,
              `${t('action')}`,
              `${t('invoice')}`,
            ]}
            renderedData={renderedOrders}
            totalPage={ordersData.totalPage}
            handleChangePage={handleChangePage}
          />
        )}
        {isSuccessOrders && ordersData.orders.length === 0 && (
          <NotFoundOrders message={t('message_no_order')} />
        )}
      </section>
    </>
  );
};

export default OrdersViews;
