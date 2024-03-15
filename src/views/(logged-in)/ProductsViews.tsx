import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductsViews = () => {
  const { t } = useTranslation('translation');
  return (
    <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
      <h2 className='text-lg font-bold'>{t('products')}</h2>
    </main>
  );
};

export default ProductsViews;
