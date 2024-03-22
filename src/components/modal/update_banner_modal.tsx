import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Modal from '@/Modal';
import Input from '../(ui)/input/input';
import ActionButton from '../(ui)/button/acction_btn';
import useCloseModal, { ModalContext } from './context/modalContext';
import { useGetCategoriesQuery } from '@/services/redux/features/label';
import { Category } from '@/types/type';
import { validateImage, validateString } from '@/services/utils/validate';
import ErrValidate from '../(ui)/err-validate/err-validate';
import { useUpdateBannerMutation } from '@/services/redux/features/products';
import { SVG } from '@/enum/Enum';
type Form = {
  content: string;
  sub_content: string;
  category: string;
};
const UpdateBannerModal = () => {
  const { t } = useTranslation('translation');
  const { state, setVisibleModal } = useContext(ModalContext);
  const [modalRef, handleClickOutside] = useCloseModal(
    'visibleUpdateBannerModal'
  );
  const banner = state.visibleUpdateBannerModal;
  const [errValidate, setErrValidate] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: categoriesData, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const [
    updateBanner,
    { isLoading: isLoadingUpdateBanner, isSuccess: isSuccessUpdateBanner },
  ] = useUpdateBannerMutation();
  const [form, setForm] = useState<Form>({
    content: '',
    sub_content: '',
    category: '',
  });
  useEffect(() => {
    if (state.visibleUpdateBannerModal) {
      setForm({
        content: banner?.content,
        sub_content: banner?.sub_content,
        category: banner?.category?.name,
      });
      setSelectedImage(banner?.image);
    }
  }, [state.visibleUpdateBannerModal]);
  const renderedCategories = useMemo(() => {
    return (
      isSuccessCategories &&
      categoriesData?.map((c: Category) => {
        return (
          <option key={c._id} className='capitalize' value={c.name}>
            {c.name}
          </option>
        );
      })
    );
  }, [isSuccessCategories, categoriesData, form.category]);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        validateString(form.content) ||
        validateString(form.sub_content) ||
        validateString(form.category)
      ) {
        const data = new FormData();
        const category = categoriesData?.find(
          (c: Category) => c.name === form.category
        );
        selectedFile && data.append('image', selectedFile as File);
        data.append('content', form.content);
        data.append('sub_content', form.sub_content);
        data.append('category', category._id);
        await updateBanner({ id: banner._id, body: data });
      } else {
        setErrValidate(true);
      }
    },
    [form, selectedFile]
  );
  const handleChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => {
        return {
          ...prevForm,
          [name]: value,
        };
      });
    },
    [form]
  );
  const handleUploadImg = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  }, []);
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            setSelectedImage(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [handleUploadImg, selectedFile]
  );
  const closeModal = useCallback(() => {
    setForm({
      content: '',
      sub_content: '',
      category: '',
    });
    setSelectedFile(null);
    setSelectedImage(null);
    setVisibleModal('visibleUpdateBannerModal');
    setErrValidate(false);
  }, []);
  useEffect(() => {
    if (isSuccessUpdateBanner) {
      closeModal();
    }
  }, [isSuccessUpdateBanner]);
  return (
    <Modal>
      <section
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          transition: 'transform 0.2s ease',
          transform: state.visibleUpdateBannerModal
            ? 'translateX(0)'
            : 'translateX(100%)',
        }}
        className='fixed top-0 right-0 z-[9999] w-full h-full text-darkGray dark:text-lightGray overflow-y-auto'
        onClick={handleClickOutside}
      >
        <form
          ref={modalRef as MutableRefObject<HTMLFormElement>}
          className='ml-auto w-full md:w-1/2 h-full flex flex-col'
          onSubmit={handleSubmit}
        >
          <div className='bg-white dark:bg-darkBlue p-6 flex justify-between items-center'>
            <div className='flex flex-col gap-[8px]'>
              <p className='text-xl'>{t('update_banner')}</p>
              <p className='text-sm'>{t('mess_update_banner')}</p>
            </div>
            <button
              className='bg-white rounded-full text-red p-3 shadow-md hover:bg-[#FCC8D1] hover:text-darkGray transition-all'
              aria-label='close-modal'
              type='button'
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
          <div className='bg-[#fff] dark:bg-darkGray p-6 flex-1 flex flex-col gap-[20p] text-gray text-sm'>
            <Input
              id='campaign_banner'
              title={`${t('campaign_banner')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <div className='flex flex-col gap-[4px]'>
                  <div className='w-full text-center cursor-pointer'>
                    <div
                      className='border-2 border-lightGray dark:border-gray border-dashed rounded-md px-6 pt-5 pb-6'
                      role='presentation'
                      onClick={handleUploadImg}
                    >
                      <input
                        accept='image/*,.jpeg,.jpg,.png,.webp'
                        type='file'
                        style={{ display: 'none' }}
                        ref={imgRef}
                        onChange={handleFileSelect}
                      />
                      <span
                        className='mx-auto flex justify-center text-3xl text-green'
                        dangerouslySetInnerHTML={{ __html: SVG.upload }}
                      ></span>
                      <p className='text-sm mt-2'>{t('upload_img')}</p>
                      <em className='text-xs text-gray-400'>
                        ({t('mess_upload_img')})
                      </em>
                    </div>
                    {selectedImage && (
                      <aside className='flex flex-row flex-wrap mt-4'>
                        <div className='relative'>
                          <img
                            className='inline-flex w-24 max-h-24 p-2 object-cover border border-gray rounded-md'
                            src={selectedImage}
                            alt={selectedImage}
                          />
                          <button
                            className='absolute top-1 right-1 border border-red text-red text-[10px] rounded-full p-[2px]'
                            aria-label='remove-img'
                            onClick={() => setSelectedImage(null)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </aside>
                    )}
                  </div>
                  {errValidate && !validateImage(selectedFile) && (
                    <ErrValidate message={'mess_upload_img'} />
                  )}
                </div>
              }
            />
            <Input
              id='content'
              title={`${t('content')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.content}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.content)}
            />
            <Input
              id='sub_content'
              title={`${t('sub_content')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.sub_content}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.sub_content)}
            />
            <Input
              id='category'
              title={`${t('category')}`}
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <div className='flex flex-col gap-[4px]'>
                  <div className='flex border border-lightGray rounded overflow-hidden'>
                    <select
                      className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none capitalize'
                      name='category'
                      id='category'
                      onChange={handleChangeForm}
                    >
                      <option value=''>{t('category')}</option>
                      {renderedCategories}
                    </select>
                  </div>
                  {errValidate && !validateString(form.category) && (
                    <ErrValidate message='validate_category' />
                  )}
                </div>
              }
            />
          </div>
          <div className='bg-white dark:bg-darkBlue p-6 flex justify-between items-center gap-[20px] text-sm'>
            <ActionButton
              type='button'
              title={`${t('cancel_btn')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center border border-lightGray dark:border-darkGray bg-[#fff] hover:bg-[#FCC8D1] text-red dark:bg-darkGray dark:text-gray dark:hover:bg-darkGray dark:hover:text-darkRed ${
                isLoadingUpdateBanner ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              func={closeModal}
              disabled={isLoadingUpdateBanner}
            />
            <ActionButton
              type='submit'
              title={`${t('update_banner')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center bg-lightGreen hover:bg-darkGreen text-white ${
                isLoadingUpdateBanner ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={isLoadingUpdateBanner}
            />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default UpdateBannerModal;
