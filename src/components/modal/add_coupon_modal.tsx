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
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from '@/services/redux/features/label';
import { Category, Tag } from '@/types/type';
import {
  validateArr,
  validateDiscount,
  validateImage,
  validateNumber,
  validateString,
} from '@/services/utils/validate';
import ErrValidate from '../(ui)/err-validate/err-validate';
import { usePostCouponMutation } from '@/services/redux/features/products';
import { SVG } from '@/enum/Enum';
type Form = {
  campaign_name: string;
  discount: string;
  max_discount: string;
  min_amount: string;
  category: string;
  tags: string[];
  published: boolean;
  campaign_start_time: string;
  campaign_end_time: string;
};
const AddCouponModal = () => {
  const { t } = useTranslation('translation');
  const [errValidate, setErrValidate] = useState(false);
  const { state, setVisibleModal } = useContext(ModalContext);
  const [modalRef, handleClickOutside] = useCloseModal('visibleAddCouponModal');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: categoriesData, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: tagsData, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  const [
    postCoupon,
    { isLoading: isLoadingPostCoupon, isSuccess: isSuccessPostCoupon },
  ] = usePostCouponMutation();
  const [form, setForm] = useState<Form>({
    campaign_name: '',
    discount: '',
    max_discount: '',
    min_amount: '',
    category: '',
    tags: [],
    published: false,
    campaign_start_time: '',
    campaign_end_time: '',
  });
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        validateImage(selectedFile) ||
        validateString(form.campaign_name) ||
        validateDiscount(form.discount) ||
        validateNumber(form.max_discount) ||
        validateNumber(form.min_amount) ||
        validateString(form.category) ||
        validateArr(form.tags) ||
        validateString(form.campaign_start_time) ||
        validateString(form.campaign_end_time)
      ) {
        const data = new FormData();
        const category = categoriesData.find(
          (c: Category) => c.name === form.category
        );
        const tags = tagsData
          .filter((t: Tag) => form.tags.includes(t.name))
          .map((t: Tag) => t._id);
        data.append('name', form.campaign_name);
        data.append('image', selectedFile as File);
        data.append('discount', form.discount);
        data.append('max_discount', form.max_discount);
        data.append('min_amount', form.min_amount);
        data.append('category', category._id);
        data.append('tags', JSON.stringify(tags));
        data.append('published', JSON.stringify(form.published));
        data.append('startDate', form.campaign_start_time);
        data.append('endDate', form.campaign_end_time);
        await postCoupon(data);
      } else {
        setErrValidate(true);
      }
    },
    [form, isSuccessCategories, isSuccessTags, categoriesData, tagsData]
  );
  const handleChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => {
        return {
          ...prevForm,
          [name]:
            name === 'tags'
              ? Array.from(new Set([...prevForm.tags, value]))
              : value,
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
  const renderedTags = useMemo(() => {
    return (
      isSuccessTags &&
      tagsData?.map((t: Tag) => {
        return (
          <option
            key={t._id}
            className={`${
              form.tags.includes(t.name) ? 'text-gray' : 'text-darkGray'
            } capitalize`}
            value={t.name}
            disabled={form.tags.includes(t.name)}
          >
            {t.name}
          </option>
        );
      })
    );
  }, [isSuccessTags, tagsData, form.tags]);
  const closeModal = useCallback(() => {
    setForm({
      campaign_name: '',
      discount: '',
      max_discount: '',
      min_amount: '',
      category: '',
      tags: [],
      published: false,
      campaign_start_time: '',
      campaign_end_time: '',
    });
    setSelectedFile(null);
    setSelectedImage(null);
    setVisibleModal('visibleAddCouponModal');
    setErrValidate(false);
  }, []);
  useEffect(() => {
    if (isSuccessPostCoupon) {
      closeModal();
    }
  }, [isSuccessPostCoupon]);
  return (
    <Modal>
      <section
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          transition: 'transform 0.2s ease',
          transform: state.visibleAddCouponModal
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
              <p className='text-xl'>{t('add_coupon')}</p>
              <p className='text-sm'>{t('mess_add_coupon')}</p>
            </div>
            <button
              className='bg-white rounded-full text-red p-3 shadow-md hover:bg-[#FCC8D1] hover:text-darkGray transition-all'
              aria-label='close-modal'
              onClick={() => setVisibleModal('visibleAddCouponModal')}
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
              id='campaign_name'
              title={`${t('campaign_name')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.campaign_name}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.campaign_name)}
            />
            <Input
              id='campaign_start_time'
              title={`${t('campaign_start_time')}`}
              type='datetime-local'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.campaign_start_time}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.campaign_start_time)}
            />
            <Input
              id='campaign_end_time'
              title={`${t('campaign_end_time')}`}
              type='datetime-local'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.campaign_end_time}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.campaign_end_time)}
            />
            <Input
              id='discount'
              title={`${t('discount')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <div className='flex flex-col gap-[4px]'>
                  <div className='flex border border-lightGray rounded overflow-hidden'>
                    <p className='h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none flex justify-center items-center'>
                      %
                    </p>
                    <input
                      id='discount'
                      name='discount'
                      className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none border-l border-lightGray'
                      type='number'
                      placeholder={`${t('discount')}`}
                      maxLength={3}
                      value={form.discount}
                      onChange={handleChangeForm}
                    />
                  </div>
                  {errValidate && !validateDiscount(form.discount) && (
                    <ErrValidate message='validate_discount' />
                  )}
                </div>
              }
            />
            <Input
              id='max_discount'
              title={`${t('max_discount')}`}
              type='number'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <div className='flex flex-col gap-[4px]'>
                  <div className='flex border border-lightGray rounded overflow-hidden'>
                    <p className='h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none flex justify-center items-center'>
                      $
                    </p>
                    <input
                      id='max_discount'
                      name='max_discount'
                      className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none border-l border-lightGray'
                      type='number'
                      placeholder={`${t('max_discount')}`}
                      maxLength={9}
                      value={form.max_discount}
                      onChange={handleChangeForm}
                    />
                  </div>
                  {errValidate && !validateNumber(form.max_discount) && (
                    <ErrValidate message='validate_max_count' />
                  )}
                </div>
              }
            />
            <Input
              id='min_amount'
              title={`${t('min_amount')}`}
              type='number'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <div>
                  <div className='flex border border-lightGray rounded overflow-hidden'>
                    <p className='h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none flex justify-center items-center'>
                      $
                    </p>
                    <input
                      id='min_amount'
                      name='min_amount'
                      className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none border-l border-lightGray'
                      type='number'
                      placeholder={`${t('min_amount')}`}
                      maxLength={9}
                      value={form.min_amount}
                      onChange={handleChangeForm}
                    />
                  </div>
                  {errValidate && !validateNumber(form.min_amount) && (
                    <ErrValidate message='validate_min_count' />
                  )}
                </div>
              }
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
            <Input
              id='tags'
              title={`${t('tags')}`}
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <div className='flex flex-col gap-[4px]'>
                  <div className='flex border border-lightGray rounded overflow-hidden'>
                    <select
                      className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] focus:outline-none capitalize'
                      name='tags'
                      id='tags'
                      onChange={handleChangeForm}
                    >
                      <option value=''>{t('tags')}</option>
                      {renderedTags}
                    </select>
                  </div>
                  {errValidate && !validateArr(form.tags) && (
                    <ErrValidate message='validate_tags' />
                  )}
                  <aside className='flex flex-wrap items-center gap-[4px] text-[#000] dark:text-white text-sm'>
                    {form.tags?.map((t) => (
                      <div
                        className='relative capitalize w-max border border-lightGray rounded-[26px] px-6 py-2'
                        key={t}
                      >
                        <p>{t}</p>
                        <button
                          className='absolute top-1 right-1 border border-red text-red text-[10px] rounded-full p-[2px]'
                          aria-label='remove-tag'
                          onClick={() =>
                            setForm((prevForm) => ({
                              ...prevForm,
                              tags: prevForm.tags.filter((tag) => tag !== t),
                            }))
                          }
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </aside>
                </div>
              }
            />
            <Input
              id='published'
              title={`${t('published')}`}
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              customChildren={
                <button
                  style={{ transition: 'background-color 0.2s linear' }}
                  className={`relative w-[80px] h-[30px] rounded-[15px] text-base font-bold text-[#fff] ${
                    form.published ? 'bg-green' : 'bg-red'
                  }`}
                  onClick={() =>
                    setForm({ ...form, published: !form.published })
                  }
                >
                  {form.published ? (
                    <span className='py-1 px-4 w-full h-full flex justify-start items-center'>
                      Yes
                    </span>
                  ) : (
                    <span className='py-1 px-4 w-full h-full flex justify-end items-center'>
                      No
                    </span>
                  )}
                  <span
                    style={{
                      transition: 'all 0.2s linear',
                      transform: form.published
                        ? 'translate(175%)'
                        : 'translate(0)',
                    }}
                    className='absolute top-[1px] left-[1px] w-[28px] h-[28px] bg-[#fff] rounded-full'
                  ></span>
                </button>
              }
            />
          </div>
          <div className='bg-white dark:bg-darkBlue p-6 flex justify-between items-center gap-[20px] text-sm'>
            <ActionButton
              type='button'
              title={`${t('cancel_btn')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center border border-lightGray dark:border-darkGray bg-[#fff] hover:bg-[#FCC8D1] text-red dark:bg-darkGray dark:text-gray dark:hover:bg-darkGray dark:hover:text-darkRed ${
                isLoadingPostCoupon ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              func={closeModal}
              disabled={isLoadingPostCoupon}
            />
            <ActionButton
              type='submit'
              title={`${t('add_coupon')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center bg-lightGreen hover:bg-darkGreen text-white ${
                isLoadingPostCoupon ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={isLoadingPostCoupon}
            />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AddCouponModal;
