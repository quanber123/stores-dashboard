import { Category } from '@/types/type';
import React from 'react';
import { FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
type Props = {
  category: Category;
};
const Categories: React.FC<Props> = ({ category }) => {
  const { id, name, image, description } = category;
  return (
    <tr className='text-center text-grays text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{id}</td>
      <td className='p-4'>
        <img
          className='m-auto w-[200px] h-[100px] object-cover'
          src={image}
          alt={name}
        />
      </td>
      <td className='p-4 capitalize'>{name}</td>
      <td className='p-4'>{description}</td>
      <td className='p-4'>
        <div className='flex justify-center items-center gap-[12px]'>
          <button
            className='text-lg flex justify-center items-center hover:text-green transition-colors'
            aria-label='update-btn'
          >
            <FaRegPenToSquare />
          </button>
          <button
            className='text-lg flex justify-center items-center hover:text-red transition-colors'
            aria-label='update-btn'
          >
            <FaRegTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Categories;
