import { Product } from '@/types/type';
import { useNavigate } from 'react-router-dom';
import { FaSearchPlus } from 'react-icons/fa';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDeleteProductMutation,
  usePublishedProductsMutation,
} from '@/services/redux/features/products';
import { FaRegTrashCan, FaRegPenToSquare, FaTrashCan } from 'react-icons/fa6';
import { ModalContext } from '@/components/modal/context/modalContext';
type Props = {
  product: Product;
};
const Products: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const { setVisibleModal } = useContext(ModalContext);
  const { _id, name, price, saleAmount, details, published } = product;
  const [updatePublished, { isLoading: isLoadingPublished }] =
    usePublishedProductsMutation();
  const [
    deleteProduct,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDelete },
  ] = useDeleteProductMutation();
  const totalQuantity = useMemo(() => {
    return details.variants
      ?.filter((v: any) => v.inStock)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);
  }, [details]);
  const handleRemove = useCallback(
    (p: Product) => {
      setVisibleModal({
        visibleAlertModal: {
          icon: <FaTrashCan className='text-red' />,
          question: (
            <p className='text-lg font-bold'>
              {t('mess_del')} <span className='text-red'>{p.name}</span> ?
            </p>
          ),
          description: `${t('des_del')}`,
          messCancel: `${t('mess_cancel')}`,
          messAccept: `${t('mess_accept_del')}`,
          acceptFunc: () => deleteProduct(p._id),
          loading: isLoadingDelete,
        },
      });
    },
    [setVisibleModal, product]
  );
  useEffect(() => {
    if (isSuccessDelete) {
      setVisibleModal('visibleAlertModal');
    }
  }, [isSuccessDelete]);
  return (
    <tr className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{_id}</td>
      <td className='p-4'>{name}</td>
      <td className='p-4'>{price} VND</td>
      <td className='p-4'>{saleAmount} VND</td>
      <td className='p-4'>{totalQuantity}</td>
      <td className={`p-4 text-white`}>
        <p
          className={`m-auto w-max px-2 rounded-xl text-[12px] ${
            totalQuantity > 0 ? 'bg-green text-[#d1fae5]' : 'bg-red'
          }`}
        >
          {totalQuantity > 0 ? t('selling') : t('sold_out')}
        </p>
      </td>
      <td className='p-4'>
        <button
          className='m-auto text-lg flex justify-center items-center hover:text-green transition-colors'
          aria-label='show'
          onClick={() => navigate(`/products/${_id}`)}
        >
          <FaSearchPlus />
        </button>
      </td>
      <td className='p-4'>
        <button
          style={{ transition: 'background-color 0.2s linear' }}
          className={`relative w-[30px] h-[15px] rounded-[15px] text-base font-bold text-[#fff] ${
            published ? 'bg-green' : 'bg-red'
          }`}
          aria-label='toggle-published'
          disabled={isLoadingPublished}
          onClick={() =>
            updatePublished({
              id: _id,
              published: !published,
            })
          }
        >
          <span
            style={{
              transition: 'all 0.2s linear',
              transform: published ? 'translate(110%)' : 'translate(0)',
            }}
            className='absolute top-[1px] left-[1px] w-[13px] h-[13px] bg-[#fff] rounded-full'
          ></span>
        </button>
      </td>
      <td className='p-4'>
        <div className='flex justify-center items-center gap-[12px]'>
          <button
            className='text-lg flex justify-center items-center hover:text-green transition-colors'
            aria-label='update-btn'
            onClick={() =>
              setVisibleModal({ visibleUpdateProductModal: { ...product } })
            }
          >
            <FaRegPenToSquare />
          </button>
          <button
            className='text-lg flex justify-center items-center hover:text-red transition-colors'
            aria-label='delete-btn'
            onClick={() => handleRemove(product)}
          >
            <FaRegTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Products;
