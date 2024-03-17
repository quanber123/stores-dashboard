import Table from '@/components/(ui)/table/table';
import FilterCustomer from '@/components/pages/customers/filter_customers';
import { useGetCustomersQuery } from '@/services/redux/features/users';
import { useMemo, useState } from 'react';
import { User } from '@/types/type';
import { useTranslation } from 'react-i18next';
import Customers from '@/components/pages/customers/customers';
const CustomersViews = () => {
  const { t, i18n } = useTranslation('translation');
  const [type, setType] = useState('oauth');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
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
  const handleChangePage = (p: number) => {
    setPage(p);
  };
  return (
    <>
      <h2 className='text-lg font-bold'>{t('customers')}</h2>
      <FilterCustomer handleFilter={handleFilter} />
      <section className='flex flex-col pb-16'>
        {isSuccessCustomers && (
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
            handleChangePage={handleChangePage}
          />
        )}
      </section>
    </>
  );
};

export default CustomersViews;
