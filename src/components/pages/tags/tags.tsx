import { Tag } from '@/types/type';
import { ModalContext } from '@/components/modal/context/modalContext';
import { useDeleteTagMutation } from '@/services/redux/features/label';
import React, { useContext } from 'react';
import { FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
type Props = {
  tag: Tag;
  index: number;
};
const Tags: React.FC<Props> = ({ tag, index }) => {
  const { _id, name } = tag;
  const { setVisibleModal } = useContext(ModalContext);
  const [deleteTag, { isLoading: isLoadingDelete }] = useDeleteTagMutation();
  return (
    <tr className='text-center text-grays text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{index + 1}</td>
      <td className='p-4'>{_id}</td>
      <td className='p-4 capitalize'>{name}</td>
      <td className='p-4'>
        <div className='flex justify-center items-center gap-[12px]'>
          <button
            className='text-lg flex justify-center items-center hover:text-green transition-colors'
            aria-label='update-btn'
            disabled={isLoadingDelete}
            onClick={() => setVisibleModal({ visibleUpdateTagModal: tag })}
          >
            <FaRegPenToSquare />
          </button>
          <button
            className='text-lg flex justify-center items-center hover:text-red transition-colors'
            aria-label='delete-btn'
            onClick={() => deleteTag(_id)}
            disabled={isLoadingDelete}
          >
            <FaRegTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Tags;
