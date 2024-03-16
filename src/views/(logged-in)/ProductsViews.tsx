import Table from '@/components/(ui)/table/table';
import FilterProducts from '@/components/pages/products/filter_products';
import { useGetProductsQuery } from '@/services/redux/features/products';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductsViews = () => {
  const { t } = useTranslation('translation');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const { data: productsData, isSuccess: isSuccessProducts } =
    useGetProductsQuery(
      `page=${page}&category=${category}&sort=${price}&search=${search}`
    );
  const renderedProducts = useMemo(() => {}, [isSuccessProducts, productsData]);
  const handleFilter = (s: string, c: string, p: string) => {
    setSearch(s);
    setCategory(c);
    setPrice(p);
  };
  const handleChangePage = (p: number) => {
    setPage(p);
  };
  return (
    <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <h2 className='text-lg font-bold'>{t('products')}</h2>
      <FilterProducts />
      {/* {isSuccessProducts && productsData.products.length > 0 && <Table tHeader={[`${t('product_name')}`, `${t('category')}`, `${t('price')}`, `${t('sale_price')}`, `${t('stock')}`, `${t('status')}`, `${t('view')}`, `${t('published')}`, `${t('action')}`]} renderedData={} handleChangePage={handleChangePage} totalPage={productsData.totalPage}/>} */}
    </main>
  );
};

export default ProductsViews;
