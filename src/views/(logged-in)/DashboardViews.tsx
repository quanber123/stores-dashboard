import Figures from '@/components/pages/dashboard/figures';
import RecentOrder from '@/components/pages/dashboard/recent-order';

const DashboardViews = () => {
  return (
    <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <Figures />
      <RecentOrder />
    </main>
  );
};

export default DashboardViews;
