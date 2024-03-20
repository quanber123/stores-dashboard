import { ModalContext } from '@/components/modal/context/modalContext';
import { useDeleteCategoryMutation } from '@/services/redux/features/label';
import { Category } from '@/types/type';
import React, { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
type Props = {
  category: Category;
};
const Categories: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation('translation');

  const { _id, id, name, image, description } = category;
  const { setVisibleModal } = useContext(ModalContext);
  const [
    deleteCategory,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDelete },
  ] = useDeleteCategoryMutation();

  const handleRemoveCategory = useCallback(
    (id: string) => {
      setVisibleModal({
        visibleAlertModal: {
          icon: <FaTrashCan className='text-red' />,
          question: (
            <p className='text-lg font-bold'>
              {t('mess_del')} <span className='text-red'>{category.name}</span>{' '}
              ?
            </p>
          ),
          description: `${t('des_del')}`,
          messCancel: `${t('mess_cancel')}`,
          messAccept: `${t('mess_accept_del')}`,
          acceptFunc: () => deleteCategory(id),
          loading: isLoadingDelete,
        },
      });
    },
    [category]
  );
  useEffect(() => {
    if (isSuccessDelete) {
      setVisibleModal('visibleAlertModal');
    }
  }, [isSuccessDelete]);
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
            aria-label='delete-btn'
            onClick={() => handleRemoveCategory(_id)}
          >
            <FaRegTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Categories;
