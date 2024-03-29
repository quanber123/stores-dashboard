import React, { useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

type Props = {
  currPage?: number;
  tHeader: string[];
  renderedData: any;
  totalPage?: number;
  handlePageChange?: any;
};
const Table: React.FC<Props> = ({
  tHeader,
  renderedData,
  totalPage,
  handlePageChange,
  currPage,
}) => {
  const handlePageClick = useCallback(
    (selectedItem: { selected: number }) => {
      handlePageChange(selectedItem.selected + 1);
    },
    [handlePageChange]
  );
  const tdHeader = useMemo(() => {
    return tHeader.map((h, index) => {
      return (
        <td key={index} className='px-4 py-2'>
          {h}
        </td>
      );
    });
  }, [tHeader]);
  return (
    <div className='w-full rounded-lg border border-lightGray dark:border-darkGray overflow-x-auto overflow-y-hidden'>
      <table className='w-full whitespace-nowrap'>
        <thead className='text-xs font-semibold tracking-wide text-left text-gray uppercase border-b border-lightGray dark:border-gray dark:text-gray dark:bg-darkGray'>
          <tr className='text-center font-bold uppercase'>{tdHeader}</tr>
        </thead>
        <tbody>{renderedData}</tbody>
      </table>
      {currPage && totalPage && totalPage > 1 && (
        <ReactPaginate
          forcePage={currPage - 1}
          className='my-2 mx-4 flex justify-end items-center gap-[10px] font-bold text-darkGray dark:text-white py-2'
          nextLabel={
            <TbChevronRight className='text-darkGray dark:text-white' />
          }
          onPageChange={handlePageClick}
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
      )}
    </div>
  );
};

export default Table;
