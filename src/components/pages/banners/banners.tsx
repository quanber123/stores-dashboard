import { Banner } from '@/types/type';
import React from 'react';
import { FaRegTrashCan, FaRegPenToSquare } from 'react-icons/fa6';
type Props = {
  banner: Banner;
};
const Banners: React.FC<Props> = ({ banner }) => {
  const { id, image, content, sub_content, category } = banner;
  return (
    <tr className='text-center text-grays text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{id}</td>
      <td className='p-4'>
        <img
          className='m-auto w-[200px] h-[100px] object-cover'
          src={image}
          alt={content}
        />
      </td>
      <td className='p-4'>{content}</td>
      <td className='p-4'>{sub_content}</td>
      <td className='p-4 capitalize'>{category.name}</td>
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

export default Banners;
