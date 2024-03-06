import React, { ReactElement } from 'react';
type Props = {
  name: string;
  color: string;
  number: string | number;
  icon: ReactElement<any>;
};
const StatsBox: React.FC<Props> = ({ name, color, number, icon }) => {
  return (
    <div className='rounded-lg bg-white dark:bg-darkGray text-darkGray dark:text-white flex gap-[20px] h-full p-4'>
      <div
        className={`${color} w-[48px] h-[48px] rounded-full flex justify-center items-center text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className='text-darkGray dark:text-lightGray'>{name}</p>
        <p className='text-xl font-bold'>{number}</p>
      </div>
    </div>
  );
};

export default StatsBox;
