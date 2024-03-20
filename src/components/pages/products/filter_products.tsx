import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from '@/services/redux/features/label';
import { Category, Tag } from '@/types/type';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
type Props = {
  handleFilter: any;
  handleReset: () => void;
};
const FilterProducts: React.FC<Props> = ({ handleFilter, handleReset }) => {
  const { t } = useTranslation('translation');
  const { data: categoriesData, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: tagsData, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  const [query, setQuery] = useState({
    search: '',
    category: '',
    tag: '',
    sort: '',
    query: '',
    published: '',
  });
  const sortButtons = [
    {
      name: `${t('newness')}`,
      value: 'date',
    },
    {
      name: `${t('oldness')}`,
      value: '-date',
    },
    {
      name: `${t('price_low_to_high')}`,
      value: '-price',
    },
    {
      name: `${t('price_high_to_low')}`,
      value: 'price',
    },
    {
      name: `${t('published')}`,
      value: 'published',
    },
    {
      name: `${t('unpublished')}`,
      value: 'unpublished',
    },
  ];
  const renderedCategories = useMemo(() => {
    return (
      isSuccessCategories &&
      categoriesData?.map((c: Category) => {
        return (
          <option key={c._id} value={c.name} className='capitalize'>
            {c.name}
          </option>
        );
      })
    );
  }, [isSuccessCategories, categoriesData]);
  const renderedTags = useMemo(() => {
    return (
      isSuccessCategories &&
      tagsData?.map((t: Tag) => {
        return (
          <option key={t._id} value={t.name} className='capitalize'>
            {t.name}
          </option>
        );
      })
    );
  }, [isSuccessTags, tagsData]);
  const renderedSort = useMemo(() => {
    return sortButtons?.map((s: any) => {
      return (
        <option key={s.name} value={s.value}>
          {s.name}
        </option>
      );
    });
  }, [sortButtons]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setQuery((prevQuery) => {
        return { ...prevQuery, [name]: value };
      });
    },
    [query]
  );
  const filter = useCallback(() => {
    handleFilter(query.search, query.category, query.tag, query.sort);
  }, [query.search, query.category, query.tag, query.sort]);
  const reset = useCallback(() => {
    setQuery({
      search: '',
      category: '',
      tag: '',
      sort: '',
      query: '',
      published: '',
    });
    handleReset();
  }, []);
  return (
    <section className='grid xl:grid-cols-5 grid-cols-1 gap-[20px] bg-white dark:bg-darkGray px-4 py-6 rounded-lg'>
      <div className='w-full flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
        <input
          name='search'
          className='w-full h-[48px] py-[4px] px-[12px] dark:bg-darkBlue focus:outline-none rounded'
          type='text'
          aria-label='search-products'
          placeholder={`${t('search_by_product_name')}`}
          value={query.search}
          onChange={handleChange}
        />
      </div>
      {isSuccessCategories && (
        <div className='w-full h-[48px]'>
          <select
            name='category'
            className='w-full h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray focus:outline-none rounded'
            onChange={handleChange}
            value={query.category}
          >
            <option value=''>{t('categories')}</option>
            {renderedCategories}
          </select>
        </div>
      )}
      {isSuccessTags && (
        <div className='w-full h-[48px]'>
          <select
            name='tag'
            className='w-full h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray focus:outline-none rounded'
            onChange={handleChange}
            value={query.tag}
          >
            <option value=''>{t('tags')}</option>
            {renderedTags}
          </select>
        </div>
      )}
      <div className='w-full h-[48px]'>
        <select
          name='sort'
          className='w-full h-full capitalize font-medium px-2 py-1 bg-white text-darkGray dark:bg-darkBlue dark:text-lightGray focus:outline-none rounded'
          onChange={handleChange}
          value={query.sort}
        >
          <option value=''>{t('sort')}</option>
          {renderedSort}
        </select>
      </div>
      <div className='w-full flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
        <button
          className='w-full h-[48px] py-[8px] px-[16px] bg-lightGreen hover:bg-darkGreen transition-colors rounded-lg text-white'
          onClick={filter}
        >
          {t('filter')}
        </button>
        <button
          className='w-full h-[48px] py-[8px] px-[16px] bg-white dark:bg-darkBlue border border-lightGray rounded-lg'
          onClick={reset}
        >
          {t('reset')}
        </button>
      </div>
    </section>
  );
};

export default FilterProducts;
