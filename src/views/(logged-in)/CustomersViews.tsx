import Table from '@/components/(ui)/table/table';
import FilterCustomer from '@/components/pages/customers/filter_customers';
import { useGetCustomersQuery } from '@/services/redux/features/users';
import { useMemo, useState } from 'react';
import { User } from '@/types/type';
import { useTranslation } from 'react-i18next';
import Customers from '@/components/pages/customers/customers';
import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
const CustomersViews = () => {
  const { t, i18n } = useTranslation('translation');
  const [type, setType] = useState('oauth');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const { data: customersData, isSuccess: isSuccessCustomers } =
    useGetCustomersQuery({ page: page, type: type, search: search });
  const renderedCustomers = useMemo(() => {
    return (
      isSuccessCustomers &&
      customersData?.users?.map((c: User) => {
        return <Customers key={c._id} customer={c} />;
      })
    );
  }, [customersData, isSuccessCustomers, i18n.language]);
  const handleFilter = (t: string, s: string) => {
    setType(t);
    setSearch(s);
  };
  const handleReset = () => {
    setSearch('');
    setPage(1);
    setType('oauth');
    // refetch();
  };
  const handlePageChange = (p: number) => {
    setPage(p);
  };
  return (
    <>
      <h2 className='text-lg font-bold'>{t('customers')}</h2>
      <FilterCustomer handleReset={handleReset} handleFilter={handleFilter} />
      <section className='flex flex-col pb-16'>
        {isSuccessCustomers && customersData?.users?.length > 0 && (
          <Table
            tHeader={[
              'ID',
              `${t('joining_date')}`,
              `${t('name')}`,
              'EMAIL',
              `${t('provider')}`,
              `${t('action')}`,
            ]}
            renderedData={renderedCustomers}
            totalPage={customersData.totalPage}
            handlePageChange={handlePageChange}
            currPage={page}
          />
        )}
        {isSuccessCustomers && customersData?.users?.length === 0 && (
          <NotFoundItem message={t('message_no_customers')} />
        )}
      </section>
    </>
  );
};

export default CustomersViews;
