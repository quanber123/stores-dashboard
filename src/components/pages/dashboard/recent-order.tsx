import Chart from '@/components/(ui)/dashboard/LineChart';
import Table from '@/components/(ui)/table/table';
import React from 'react';

const RecentOrder = () => {
  return (
    <section className='flex flex-col gap-[20px]'>
      <h2 className='text-lg font-bold'>Recent Order</h2>
      <Table
        tHeader={[
          'INVOICE NO',
          'ORDER TIME',
          'CUSTOMER NAME',
          'METHOD',
          'AMOUNT',
          'STATUS',
          'ACTION',
          'INVOICE',
        ]}
        totalPage={18}
      />
    </section>
  );
};

export default RecentOrder;
