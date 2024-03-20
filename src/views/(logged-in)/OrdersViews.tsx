import { useMemo, useState } from 'react';
import Table from '@/components/(ui)/table/table';
import FilterOrders from '@/components/pages/orders/filter_orders';
import { useGetOrdersQuery } from '@/services/redux/features/orders';
import { HandleFilterFunction, Order } from '@/types/type';
import { useTranslation } from 'react-i18next';
import Orders from '@/components/pages/orders/orders';
import { SVG } from '@/enum/Enum';
import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
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
    search && setSearch(search);
    status && setCurrStatus(status);
    ordersLimit && setOrdersLimit(ordersLimit);
    method && setMethod(method);
    startDate && setStartDate(startDate);
    endDate && setEndDate(endDate);
  };
  const handlePageChange = (p: number) => {
    setPage(p);
  };
  const handleReset = () => {
    setPage(1);
    setSearch('');
    setCurrStatus('');
    setOrdersLimit('');
    setStartDate('');
    setEndDate('');
    setMethod('');
  };
  return (
    <>
      <h2 className='text-lg font-bold'>{t('orders')}</h2>
      <FilterOrders handleReset={handleReset} handleFilter={handleFilter} />
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
            handlePageChange={handlePageChange}
            currPage={page}
          />
        )}
        {isSuccessOrders && ordersData.orders.length === 0 && (
          <NotFoundItem
            color='text-red'
            img={SVG.order}
            message={t('message_no_order')}
          />
        )}
      </section>
    </>
  );
};

export default OrdersViews;
