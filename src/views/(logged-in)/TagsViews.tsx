import NotFoundItem from '@/components/(ui)/not-found-item/not_found_item';
import Table from '@/components/(ui)/table/table';
import AddTagModal from '@/components/modal/add_tag_modal';
import { ModalContext } from '@/components/modal/context/modalContext';
import Tags from '@/components/pages/tags/tags';
import { useGetTagsQuery } from '@/services/redux/features/label';
import { Tag } from '@/types/type';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa6';
const TagsViews = () => {
  const { t, i18n } = useTranslation('translation');
  const { setVisibleModal } = useContext(ModalContext);
  const { data: tagsData, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  const renderedBanners = useMemo(() => {
    return (
      isSuccessTags &&
      tagsData?.map((t: Tag, index: number) => {
        return <Tags key={index} tag={t} index={index} />;
      })
    );
  }, [isSuccessTags, tagsData, i18n.language]);
  return (
    <>
      <AddTagModal />
      <div className='grid grid-cols-2'>
        <h2 className='text-lg font-bold'>{t('tags')}</h2>
        <button
          className='ml-auto w-[192px] h-[36px] md:h-[48px] rounded-md text-white bg-lightGreen hover:bg-darkGreen transition-colors flex justify-center items-center gap-[10px] focus:outline-none'
          onClick={() => setVisibleModal('visibleAddTagModal')}
        >
          <FaPlus /> {t('add_tag')}
        </button>
      </div>
      {isSuccessTags && tagsData.length > 0 && (
        <Table
          tHeader={[`${t('sr')}`, `ID`, `${t('tags')}`, `${t('action')}`]}
          renderedData={renderedBanners}
        />
      )}
      {isSuccessTags && tagsData.length === 0 && (
        <NotFoundItem message={t('message_no_tags')} />
      )}
    </>
  );
};

export default TagsViews;
