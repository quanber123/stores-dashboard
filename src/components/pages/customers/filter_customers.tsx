import React, { useCallback, useRef, useState } from 'react';
type Props = {
  handleFilter: any;
};
const FilterCustomer: React.FC<Props> = ({ handleFilter }) => {
  const [currProvider, setCurrProvider] = useState('oauth');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleChangeProvider = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrProvider(e.target.value);
    },
    [currProvider]
  );
  const filter = useCallback(() => {
    handleFilter(currProvider, searchRef.current?.value ?? null);
  }, [currProvider, searchRef.current?.value]);

  const reset = useCallback(() => {
    setCurrProvider('oauth');
    handleFilter('oauth', null);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  }, [currProvider, searchRef.current?.value]);

  return (
    <section className='flex flex-col gap-[40px]'>
      <h2 className='text-lg font-bold'>Customers</h2>
      <div className='rounded-lg bg-white dark:bg-darkGray px-4 py-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'>
        <div className='h-[48px]'>
          <select
            className='h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray'
            onChange={handleChangeProvider}
            value={currProvider}
          >
            <option value='oauth'>Provider: Google/Facebook</option>
            <option value='auth'>Provider: Default</option>
          </select>
        </div>
        <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
          <input
            className='w-full h-[48px] py-[4px] px-[12px] dark:bg-darkBlue focus:outline-none rounded'
            type='text'
            aria-label='search-users'
            placeholder='Search by name/email'
            ref={searchRef}
          />
        </div>
        <div className='flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
          <button
            className='w-full h-[48px] py-[8px] px-[16px] bg-lightGreen hover:bg-darkGreen transition-colors rounded-lg text-white'
            onClick={filter}
          >
            Filter
          </button>
          <button
            className='w-full h-[48px] py-[8px] px-[16px] bg-white dark:bg-darkBlue border border-lightGray rounded-lg'
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterCustomer;
