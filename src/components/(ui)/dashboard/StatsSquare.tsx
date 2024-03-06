import React from 'react';
import { TbStack2 } from 'react-icons/tb';
type Props = {
  name: string;
  color: string;
  number: string | number;
  currency: string | null;
};
const StatsSquare: React.FC<Props> = ({ name, color, number, currency }) => {
  return (
    <div
      className={`${color} min-w-0 rounded-lg flex flex-col justify-center items-center gap-2 h-[140px] text-white`}
    >
      <TbStack2 className='text-5xl' />
      <p className='text-lg'>{name}</p>
      <p className='text-xl font-bold'>
        {number} {currency !== null && currency}
      </p>
    </div>
  );
};

export default StatsSquare;
