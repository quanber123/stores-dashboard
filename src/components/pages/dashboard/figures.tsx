import StatsBox from '@/components/(ui)/dashboard/StatsBox';
import StatsSquare from '@/components/(ui)/dashboard/StatsSquare';
import TinyLineChart from '@/components/(ui)/dashboard/LineChart';
import { useCallback, useMemo, useState } from 'react';
import { TbShoppingCart, TbRefresh, TbTruck, TbCheck } from 'react-icons/tb';
import PieChartData from '@/components/(ui)/dashboard/PieChart';
import {
  useGetTotalFiguresAmountQuery,
  useGetTotalFiguresCountQuery,
} from '@/services/redux/features/figures';
const Figures = () => {
  const { data: figuresCount, isSuccess: isSuccessFiguresCount } =
    useGetTotalFiguresCountQuery(null);
  const { data: figuresAmount, isSuccess: isSuccessFiguresAmount } =
    useGetTotalFiguresAmountQuery(null);
  const [currChart, setCurrChart] = useState('sales');
  const statsSquare = [
    {
      name: 'Today Orders',
      color: 'bg-lightGreen',
      number:
        (isSuccessFiguresAmount && figuresAmount.amountToday[0]?.totalAmount) ||
        0,
      currency:
        (isSuccessFiguresAmount && figuresAmount.amountToday[0]?.currency) ||
        null,
    },
    {
      name: 'Yesterday Orders',
      color: 'bg-yellow',
      number:
        (isSuccessFiguresAmount &&
          figuresAmount.amountYesterday[0]?.totalAmount) ||
        0,
      currency:
        (isSuccessFiguresAmount &&
          figuresAmount.amountYesterday[0]?.currency) ||
        null,
    },
    {
      name: 'This Month',
      color: 'bg-blue',
      number:
        (isSuccessFiguresAmount &&
          figuresAmount.amountThisMonth[0]?.totalAmount) ||
        0,
      currency:
        (isSuccessFiguresAmount &&
          figuresAmount.amountThisMonth[0]?.currency) ||
        null,
    },
    {
      name: 'Last Month',
      color: 'bg-mdBlue',
      number:
        (isSuccessFiguresAmount &&
          figuresAmount.amountLastMonth[0]?.totalAmount) ||
        0,
      currency:
        (isSuccessFiguresAmount &&
          figuresAmount.amountLastMonth[0]?.currency) ||
        null,
    },
    {
      name: 'All-Time Sales',
      color: 'bg-green',
      number:
        (isSuccessFiguresAmount &&
          figuresAmount.amountAllSalesTime[0]?.totalAmount) ||
        0,
      currency:
        (isSuccessFiguresAmount &&
          figuresAmount.amountAllSalesTime[0]?.currency) ||
        null,
    },
  ];
  const statsBox = [
    {
      name: 'Total Orders',
      color: 'bg-orange',
      number: isSuccessFiguresCount && figuresCount.totalOrders,
      icon: <TbShoppingCart className='text-white' />,
    },
    {
      name: 'Orders Pending',
      color: 'bg-blue',
      number: isSuccessFiguresCount && figuresCount.pendingOrders,
      icon: <TbRefresh className='text-white' />,
    },
    {
      name: 'Orders Processing',
      color: 'bg-cyan',
      number: isSuccessFiguresCount && figuresCount.processingOrders,
      icon: <TbTruck className='text-white' />,
    },
    {
      name: 'Orders Delivered',
      color: 'bg-lightGreen',
      number: isSuccessFiguresCount && figuresCount.deliveredOrders,
      icon: <TbCheck className='text-white' />,
    },
  ];
  const renderedStatsSquare = useMemo(() => {
    return statsSquare.map((s) => {
      return (
        <StatsSquare
          key={s.name}
          name={s.name}
          color={s.color}
          number={s.number}
          currency={s.currency}
        />
      );
    });
  }, [statsSquare]);
  const renderedStatsBox = useMemo(() => {
    return statsBox.map((s) => {
      return (
        <StatsBox
          key={s.name}
          name={s.name}
          color={s.color}
          number={s.number}
          icon={s.icon}
        />
      );
    });
  }, [statsBox]);
  const toggleChart = useCallback(
    (chart: string) => {
      setCurrChart(chart);
    },
    [currChart]
  );
  return (
    <section className='flex flex-col gap-[40px]'>
      <h2 className='text-lg font-bold'>DashBoard Overview</h2>
      <div className='grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2'>
        {renderedStatsSquare}
      </div>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {renderedStatsBox}
      </div>
      <div className='grid gap-4 xl:grid-cols-2 my-8'>
        <div className='bg-white dark:bg-darkGray rounded-lg p-4 flex flex-col gap-[20px]'>
          <h3 className='font-bold'>Weekly Sales</h3>
          <div className='flex items-center gap-[20px] border-b border-gray text-sm'>
            <button
              className={`w-[54px] pb-2 ${
                currChart === 'sales'
                  ? 'text-lightGreen border-b-2 border-lightGreen'
                  : ''
              }`}
              onClick={() => toggleChart('sales')}
            >
              Sales
            </button>
            <button
              className={`w-[54px] pb-2 ${
                currChart === 'orders'
                  ? 'text-lightGreen border-b-2 border-lightGreen'
                  : ''
              }`}
              onClick={() => toggleChart('orders')}
            >
              Orders
            </button>
          </div>
          <TinyLineChart />
        </div>
        <div className='bg-white dark:bg-darkGray rounded-lg p-4 flex flex-col gap-[20px]'>
          <h3 className='font-bold'>Best Selling Products</h3>
          <PieChartData />
        </div>
      </div>
    </section>
  );
};

export default Figures;
