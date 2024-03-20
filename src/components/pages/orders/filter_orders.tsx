import { status } from '@/services/redux/slice/statusSlice';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
type Props = {
  handleFilter: any;
  handleReset: () => void;
};
const FilterOrders: React.FC<Props> = ({ handleFilter, handleReset }) => {
  const { t } = useTranslation('translation');
  const allStatus = useSelector(status);
  const [currStatus, setCurrStatus] = useState('');
  const [ordersLimit, setOrdersLimit] = useState('');
  const [currMethod, setCurrMethod] = useState('');
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const searchRef = useRef<HTMLInputElement | null>(null);
  const renderedStatus = useMemo(() => {
    return allStatus?.map((s) => {
      return (
        <option className='capitalize' key={s._id} value={s.name}>
          {s.name}
        </option>
      );
    });
  }, [allStatus]);
  const handleChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrStatus(e.target.value);
    },
    [currStatus]
  );
  const handleOrdersLimit = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setOrdersLimit(e.target.value);
    },
    [ordersLimit]
  );
  const handleMethod = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrMethod(e.target.value);
    },
    [currMethod]
  );
  const handleChangeDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDate((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    [date]
  );
  const filter = useCallback(() => {
    handleFilter(
      searchRef.current?.value,
      currStatus,
      ordersLimit,
      currMethod,
      date.startDate,
      date.endDate
    );
  }, [searchRef.current?.value, currStatus, ordersLimit, currMethod, date]);
  const reset = useCallback(() => {
    handleReset();
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    setCurrStatus('');
    setOrdersLimit('');
    setCurrMethod('');
    setDate({ startDate: '', endDate: '' });
  }, []);
  return (
    <section className='bg-white dark:bg-darkGray p-4 flex flex-col gap-[20px]'>
      <div className='grid xl:grid-cols-4 grid-cols-1 gap-[20px]'>
        <div className='w-full h-[48px]'>
          <input
            className='w-full h-full py-[4px] px-[12px] dark:bg-darkBlue focus:outline-none rounded'
            type='text'
            aria-label='search-orders'
            placeholder={`${t('search_by_customer')}`}
            ref={searchRef}
          />
        </div>
        <div className='w-full h-[48px] flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
          <select
            className='w-full h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray rounded'
            onChange={handleChangeStatus}
            value={currStatus}
          >
            <option value=''>{t('status')}</option>
            {renderedStatus}
          </select>
        </div>
        <div className='w-full h-[48px] flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
          <select
            className='w-full h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray rounded'
            onChange={handleOrdersLimit}
            value={ordersLimit}
          >
            <option value=''>{t('orders_limit')}</option>
            <option value={5}>{t('5_days_orders')}</option>
            <option value={7}>{t('7_days_orders')}</option>
            <option value={15}>{t('15_days_orders')}</option>
            <option value={30}>{t('30_days_orders')}</option>
          </select>
        </div>
        <div className='w-full h-[48px] flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
          <select
            className='w-full h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray rounded'
            onChange={handleMethod}
            value={currMethod}
          >
            <option value=''>{t('payment_method')}</option>
            <option value='cash'>{t('cash')}</option>
            <option value='transfer'>{t('transfer')}</option>
          </select>
        </div>
      </div>
      <div className='grid xl:grid-cols-3 grid-cols-1 gap-[20px]'>
        <div>
          <label htmlFor='startDate'>{t('start_date')}</label>
          <input
            id='startDate'
            name='startDate'
            className='w-full h-[48px] py-[4px] px-[12px] dark:bg-darkBlue focus:outline-none rounded'
            type='date'
            value={date.startDate}
            onChange={handleChangeDate}
          />
        </div>
        <div>
          <label htmlFor='endDate'>{t('end_date')}</label>
          <input
            id='endDate'
            name='endDate'
            className='w-full h-[48px] py-[4px] px-[12px] dark:bg-darkBlue focus:outline-none rounded'
            type='date'
            value={date.endDate}
            onChange={handleChangeDate}
          />
        </div>
        <div className='flex items-end gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
          <button
            className='w-full h-[48px] py-[8px] px-[16px] bg-lightGreen hover:bg-darkGreen transition-colors rounded-lg text-white'
            onClick={filter}
          >
            {t('filter')}
          </button>
          <button
            className='w-full h-[48px] py-[8px] px-[16px] bg-white dark:bg-darkBlue border border-lightGray rounded-lg'
            onClick={reset}
          >
            {t('reset')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterOrders;
