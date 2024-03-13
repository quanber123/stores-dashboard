import React, { useCallback, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

type Props = {
  tHeader: string[];
  renderedData: any;
  totalPage: number;
  handleChangePage: any;
};
const Table: React.FC<Props> = ({
  tHeader,
  renderedData,
  totalPage,
  handleChangePage,
}) => {
  const [currPage, setCurrPage] = useState(0);
  const handlePageClick = useCallback(
    (selectedItem: { selected: number }) => {
      setCurrPage(selectedItem.selected + 1);
      handleChangePage(selectedItem.selected + 1);
    },
    [currPage, totalPage]
  );
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
    <div className='rounded-lg border border-lightGray dark:border-darkGray'>
      <table className='w-full whitespace-nowrap'>
        <thead className='text-xs font-semibold tracking-wide text-left text-gray uppercase border-b border-lightGray dark:border-gray dark:text-gray dark:bg-darkGray'>
          <tr className='text-center font-bold'>{tdHeader}</tr>
        </thead>
        <tbody>{renderedData}</tbody>
      </table>
      {totalPage > 1 && (
        <ReactPaginate
          forcePage={currPage}
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
