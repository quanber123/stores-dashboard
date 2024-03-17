import FilterProducts from '@/components/pages/products/filter_products';
import { useTranslation } from 'react-i18next';

const ProductsViews = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <h2 className='text-lg font-bold'>{t('products')}</h2>
      <FilterProducts />
    </>
  );
};

export default ProductsViews;
