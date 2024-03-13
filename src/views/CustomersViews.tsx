import Table from '@/components/(ui)/table/table';
import FilterCustomer from '@/components/pages/customers/filter_customers';
import { useGetCustomersQuery } from '@/services/redux/features/users';
import { useMemo, useState } from 'react';
import { User } from '@/types/type';
import { formatDate } from '@/services/utils/format';
const CustomersViews = () => {
  const [type, setType] = useState('oauth');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const { data: customersData, isSuccess: isSuccessCustomers } =
    useGetCustomersQuery({ page: page, type: type, search: search });
  const renderedCustomers = useMemo(() => {
    return (
      isSuccessCustomers &&
      customersData?.users?.map((c: User) => {
        return (
          <tr
            className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'
            key={c._id}
          >
            <td className='py-2'>{c.id}</td>
            <td className='py-2'>{formatDate(c.created_at)}</td>
            <td className='py-2'>{c.name}</td>
            <td className='py-2'>{c.email ? c.email : 'null'}</td>
            <td className='py-2 capitalize'>
              {c.oauthProvider ? c.oauthProvider : 'default'}
            </td>
            <td className='py-2'>Actions</td>
          </tr>
        );
      })
    );
  }, [customersData, isSuccessCustomers]);
  const handleFilter = (t: string, s: string) => {
    setType(t);
    setSearch(s);
  };
  const handleChangePage = (p: number) => {
    setPage(p);
  };
  return (
    <main className='w-full h-full xl:ml-[256px] mt-[64px] py-8 px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <FilterCustomer handleFilter={handleFilter} />
      {isSuccessCustomers && (
        <Table
          tHeader={[
            'ID',
            'JOINING DATE',
            'NAME',
            'EMAIL',
            'Provider',
            'ACTIONS',
          ]}
          renderedData={renderedCustomers}
          totalPage={customersData.totalPage}
          handleChangePage={handleChangePage}
        />
      )}
    </main>
  );
};

export default CustomersViews;
