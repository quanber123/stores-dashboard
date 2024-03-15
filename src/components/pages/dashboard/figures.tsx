import StatsBox from '@/components/(ui)/dashboard/StatsBox';
import StatsSquare from '@/components/(ui)/dashboard/StatsSquare';
import TinyLineChart from '@/components/(ui)/dashboard/LineChart';
import { useCallback, useMemo, useState } from 'react';
import { TbShoppingCart, TbRefresh, TbTruck, TbCheck } from 'react-icons/tb';
import PieChartData from '@/components/(ui)/dashboard/PieChart';
import {
  useGetBestSellingQuery,
  useGetTotalFiguresAmountQuery,
  useGetTotalFiguresCountQuery,
  useGetWeeklyFiguresQuery,
} from '@/services/redux/features/figures';
import { useTranslation } from 'react-i18next';
const Figures = () => {
  const { t } = useTranslation('translation');
  const { data: figuresCount, isSuccess: isSuccessFiguresCount } =
    useGetTotalFiguresCountQuery(null);
  const { data: figuresAmount, isSuccess: isSuccessFiguresAmount } =
    useGetTotalFiguresAmountQuery(null);
  const { data: weeklyFigures, isSuccess: isSuccessWeeklyFigures } =
    useGetWeeklyFiguresQuery(null);
  const { data: bestSelling, isSuccess: isSuccessBestSelling } =
    useGetBestSellingQuery(null);
  const [currChart, setCurrChart] = useState('sales');
  const statsSquare = [
    {
      name: `${t('today_orders')}`,
      color: 'bg-lightGreen',
      number:
        (isSuccessFiguresAmount && figuresAmount.amountToday[0]?.totalAmount) ||
        0,
      currency:
        (isSuccessFiguresAmount && figuresAmount.amountToday[0]?.currency) ||
        null,
    },
    {
      name: `${t('yesterday_orders')}`,
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
      name: `${t('thismonth_orders')}`,
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
      name: `${t('lastmonth_orders')}`,
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
      name: `${t('all_time_sales')}`,
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
      name: `${t('total_orders')}`,
      color: 'bg-orange',
      number: isSuccessFiguresCount && figuresCount.totalOrders,
      icon: <TbShoppingCart className='text-white' />,
    },
    {
      name: `${t('orders_pending')}`,
      color: 'bg-blue',
      number: isSuccessFiguresCount && figuresCount.pendingOrders,
      icon: <TbRefresh className='text-white' />,
    },
    {
      name: `${t('orders_processing')}`,
      color: 'bg-cyan',
      number: isSuccessFiguresCount && figuresCount.processingOrders,
      icon: <TbTruck className='text-white' />,
    },
    {
      name: `${t('orders_delivered')}`,
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
      <h2 className='text-lg font-bold'>{t('dashboard_overview')}</h2>
      <div className='grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2'>
        {renderedStatsSquare}
      </div>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {renderedStatsBox}
      </div>
      <div className='grid gap-4 xl:grid-cols-2 my-8'>
        <div className='bg-white dark:bg-darkGray rounded-lg p-4 flex flex-col gap-[20px]'>
          <h3 className='font-bold'>{t('weekly_sales')}</h3>
          <div className='flex items-center gap-[20px] border-b border-gray text-sm'>
            <button
              className={`w-[72px] pb-2 ${
                currChart === 'sales'
                  ? 'text-lightGreen border-b-2 border-lightGreen'
                  : ''
              }`}
              onClick={() => toggleChart('sales')}
            >
              {t('sales')}
            </button>
            <button
              className={`w-[72px] pb-2 ${
                currChart === 'orders'
                  ? 'text-lightGreen border-b-2 border-lightGreen'
                  : ''
              }`}
              onClick={() => toggleChart('orders')}
            >
              {t('orders')}
            </button>
          </div>
          {isSuccessWeeklyFigures && currChart === 'sales' && (
            <TinyLineChart figures={weeklyFigures.totalSales} />
          )}
          {isSuccessWeeklyFigures && currChart === 'orders' && (
            <TinyLineChart figures={weeklyFigures.totalOrders} />
          )}
        </div>
        <div className='bg-white dark:bg-darkGray rounded-lg p-4 flex flex-col gap-[20px]'>
          <h3 className='font-bold'>{t('best_selling_products')}</h3>
          {isSuccessBestSelling && <PieChartData data={bestSelling} />}
        </div>
      </div>
    </section>
  );
};

export default Figures;
