import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
import Table from '@/components/(ui)/table/table';
import AddProductModal from '@/components/modal/add_product_modal';
import { ModalContext } from '@/components/modal/context/modalContext';
import UpdateProductModal from '@/components/modal/update_product_modal';
import FilterProducts from '@/components/pages/products/filter_products';
import Products from '@/components/pages/products/products';
import { useGetProductsQuery } from '@/services/redux/features/products';
import { HandleFilterFunction, Product } from '@/types/type';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa6';

const ProductsViews = () => {
  const { t } = useTranslation('translation');
  const { setVisibleModal } = useContext(ModalContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const { data: productsData, isSuccess: isSuccessProducts } =
    useGetProductsQuery(
      `page=${page}&category=${category}&tag=${tag}&sort=${sort}&search=${search}`
    );
  const renderedProducts = useMemo(() => {
    return (
      isSuccessProducts &&
      productsData?.products.map((p: Product) => {
        return <Products key={p._id} product={p} />;
      })
    );
  }, [isSuccessProducts, productsData]);
  const handleFilter: HandleFilterFunction = (search, category, tag, sort) => {
    search && setSearch(search);
    category && setCategory(category);
    tag && setTag(tag as string);
    sort && setSort(sort);
  };
  const handlePageChange = (p: number) => {
    setPage(p);
  };
  const handleReset = () => {
    setPage(1);
    setSearch('');
    setCategory('');
    setTag('');
    setSort('');
  };
  return (
    <>
      <AddProductModal />
      <UpdateProductModal />
      <div className='grid grid-cols-2'>
        <h2 className='text-lg font-bold'>{t('products')}</h2>
        <button
          className='ml-auto w-[192px] h-[36px] md:h-[48px] rounded-md text-white bg-lightGreen hover:bg-darkGreen transition-colors flex justify-center items-center gap-[10px] focus:outline-none'
          onClick={() => setVisibleModal('visibleAddProductModal')}
        >
          <FaPlus /> {t('add_product')}
        </button>
      </div>
      <FilterProducts handleReset={handleReset} handleFilter={handleFilter} />
      {isSuccessProducts && productsData.products?.length > 0 && (
        <Table
          tHeader={[
            'ID',
            `${t('product_name')}`,
            `${t('price')}`,
            `${t('sale_price')}`,
            `${t('stock')}`,
            `${t('status')}`,
            `${t('view')}`,
            `${t('published')}`,
            `${t('action')}`,
          ]}
          currPage={page}
          renderedData={renderedProducts}
          totalPage={productsData.totalPage}
          handlePageChange={handlePageChange}
        />
      )}
      {isSuccessProducts && productsData.products?.length === 0 && (
        <NotFoundItem message={t('mess_no_products')} />
      )}
    </>
  );
};

export default ProductsViews;
