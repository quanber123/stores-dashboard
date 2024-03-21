import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
import Table from '@/components/(ui)/table/table';
import AddCategoryModal from '@/components/modal/add_category_modal';
import { ModalContext } from '@/components/modal/context/modalContext';
import UpdateCategoryModal from '@/components/modal/update_category_modal';
import Categories from '@/components/pages/categores/categories';
import { useGetCategoriesQuery } from '@/services/redux/features/label';
import { Category } from '@/types/type';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa6';
const CategoriesViews = () => {
  const { t } = useTranslation('translation');
  const { setVisibleModal } = useContext(ModalContext);
  const { data: categoriesData, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const renderedCategories = useMemo(() => {
    return (
      isSuccessCategories &&
      categoriesData?.map((c: Category) => {
        return <Categories key={c._id} category={c} />;
      })
    );
  }, [isSuccessCategories, categoriesData]);
  return (
    <>
      <AddCategoryModal />
      <UpdateCategoryModal />
      <div className='grid grid-cols-2'>
        <h2 className='text-lg font-bold'>{t('categories')}</h2>
        <button
          className='ml-auto w-[192px] h-[36px] md:h-[48px] rounded-md text-white bg-lightGreen hover:bg-darkGreen transition-colors flex justify-center items-center gap-[10px] focus:outline-none'
          onClick={() => setVisibleModal('visibleAddCategoryModal')}
        >
          <FaPlus /> {t('add_category')}
        </button>
      </div>
      {isSuccessCategories && categoriesData.length > 0 && (
        <Table
          tHeader={[
            `ID`,
            `${t('img')}`,
            `${t('name')}`,
            `${t('description')}`,
            `${t('action')}`,
          ]}
          renderedData={renderedCategories}
        />
      )}
      {isSuccessCategories && categoriesData.length === 0 && (
        <NotFoundItem message={t('message_no_categories')} />
      )}
    </>
  );
};

export default CategoriesViews;
