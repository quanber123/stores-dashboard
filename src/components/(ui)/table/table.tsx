import React, { useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

type Props = {
  tHeader: string[];
  totalPage: number;
};
const Table: React.FC<Props> = ({ tHeader, totalPage }) => {
  const tdHeader = useMemo(() => {
    return tHeader.map((h) => {
      return (
        <td key={h} className='py-2'>
          {h}
        </td>
      );
    });
  }, [tHeader]);
  return (
    <div className='rounded-lg border border-lightGray dark:border-darkGray overflow-hidden'>
      <table className='w-full whitespace-nowrap'>
        <thead className='text-xs font-semibold tracking-wide text-left text-gray uppercase border-b border-lightGray dark:border-gray dark:text-gray dark:bg-darkGray'>
          <tr className='text-center font-bold'>{tdHeader}</tr>
        </thead>
        <tbody>
          <tr className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray'>
            <td className='py-2'>10740</td>
            <td className='py-2'>Feb 26, 2024 7:52 AM</td>
            <td className='py-2'>jg ghjgj </td>
            <td className='py-2'>Cash</td>
            <td className='py-2'>$132.72</td>
            <td className='py-2'>Cancel</td>
            <td className='py-2'></td>
            <td className='py-2'></td>
          </tr>
        </tbody>
      </table>
      <ReactPaginate
        // forcePage={currPage}
        className='flex justify-end items-center gap-[10px] font-bold text-darkGray dark:text-white py-2'
        nextLabel={<TbChevronRight className='text-darkGray dark:text-white' />}
        // onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel={
          <TbChevronLeft className='text-darkGray dark:text-white' />
        }
        pageClassName='text-sm w-[32px] h-[32px] flex justify-center items-center cursor-pointer'
        pageLinkClassName='w-full h-full flex justify-center items-center'
        nextClassName='text-darkGray'
        breakLabel='...'
        breakClassName='page-item'
        containerClassName='pagination'
        activeClassName='bg-green rounded-[4px] text-white'
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Table;
