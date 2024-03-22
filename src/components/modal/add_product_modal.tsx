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
  allowImage,
  validateArr,
  validateNumber,
  validateString,
} from '@/services/utils/validate';
import ErrValidate from '../(ui)/err-validate/err-validate';
import { SVG } from '@/enum/Enum';
import { FaTrash } from 'react-icons/fa6';
import { usePostProductMutation } from '@/services/redux/features/products';
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from '@/services/redux/features/label';
import { Category, Tag } from '@/types/type';
type Variants = {
  color: string;
  size: string;
  quantity: string;
};
type Form = {
  product_name: string;
  description: string;
  short_description: string;
  weight: string;
  dimensions: string;
  materials: string;
  price: string;
  category: string;
  tags: string[];
  variants: Variants[];
};
const AddProductModal = () => {
  const { t } = useTranslation('translation');
  const [errValidate, setErrValidate] = useState(false);
  const [errVariants, setErrVariants] = useState(false);
  const [errImg, setErrImg] = useState('');
  const { state, setVisibleModal } = useContext(ModalContext);
  const [modalRef, handleClickOutside] = useCloseModal(
    'visibleAddProductModal'
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { data: categoriesData, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: tagsData, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  const [
    postProduct,
    { isLoading: isLoadingPostProduct, isSuccess: isSuccessPostProduct },
  ] = usePostProductMutation();
  const [form, setForm] = useState<Form>({
    product_name: '',
    description: '',
    short_description: '',
    weight: '',
    dimensions: '',
    materials: '',
    price: '',
    category: '',
    tags: [],
    variants: [],
  });
  const [variants, setVariants] = useState<Variants>({
    color: '',
    size: '',
    quantity: '',
  });
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        validateString(form.product_name) &&
        validateString(form.description) &&
        validateString(form.short_description) &&
        validateString(form.weight) &&
        validateString(form.dimensions) &&
        validateString(form.materials) &&
        validateString(form.price) &&
        validateString(form.category) &&
        form.tags.length > 0 &&
        form.variants.length > 0
      ) {
        const data = new FormData();
        const category = categoriesData.find(
          (c: Category) => c.name === form.category
        );
        const tags = tagsData
          .filter((t: Tag) => form.tags?.includes(t.name))
          .map((t: Tag) => t._id);
        data.append('name', form.product_name);
        data.append('description', form.description);
        data.append('shortDescription', form.short_description);
        data.append('weight', form.weight);
        data.append('dimensions', form.dimensions);
        data.append('materials', form.materials);
        data.append('price', form.price);
        data.append('category', category._id);
        data.append('tags', JSON.stringify(tags));
        data.append('variants', JSON.stringify(form.variants));
        selectedImages.forEach((images) => {
          data.append(`images`, images);
        });
        await postProduct(data);
      } else {
        setErrValidate(true);
      }
    },
    [postProduct, form, selectedImages]
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
    []
  );
  const removeDuplicates = useCallback((arr: Variants[]) => {
    const uniqueVariants: { [key: string]: Variants } = {};
    arr.forEach((variant) => {
      const key = `${variant.color.toLowerCase()}-${variant.size.toLowerCase()}`;
      if (
        !uniqueVariants[key] ||
        parseInt(variant.quantity) > parseInt(uniqueVariants[key].quantity)
      ) {
        uniqueVariants[key] = variant;
      }
    });
    return Object.values(uniqueVariants);
  }, []);
  const handleGenerateVariants = useCallback(() => {
    if (
      validateString(variants.size) &&
      validateString(variants.color) &&
      validateNumber(variants.quantity)
    ) {
      setErrValidate(false);
      setErrVariants(false);
      setForm((prevForm) => {
        const newVariant: Variants = {
          size: variants.size.toLocaleLowerCase(),
          color: variants.color.toLowerCase(),
          quantity: variants.quantity,
        };
        const updatedVariants = removeDuplicates([
          ...prevForm.variants,
          newVariant,
        ]);
        return {
          ...prevForm,
          variants: updatedVariants,
        };
      });
      setVariants({ color: '', size: '', quantity: '' });
    } else {
      setErrVariants(true);
    }
  }, [variants]);
  const handleVariantsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setVariants((prevForm) => {
        return {
          ...prevForm,
          [name]: value,
        };
      });
    },
    []
  );

  const handleRemoveVariant = useCallback(
    (size: string) => {
      setForm((prevForm) => ({
        ...prevForm,
        variants: prevForm.variants.filter((variant) => variant.size !== size),
      }));
    },
    [form.variants]
  );
  const handleUploadImg = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  }, [imgRef.current]);
  const handleImagesSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newImages = Array.from(files).filter((file) =>
          allowImage.some((ext) => file.name.toLowerCase().endsWith(ext))
        );
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        setErrImg(
          newImages.length !== files.length ? `${t('mess_upload_img')}` : ''
        );
      }
    },
    []
  );
  const handleRemoveImage = useCallback((index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, []);
  const closeModal = useCallback(() => {
    setVariants({
      color: '',
      size: '',
      quantity: '',
    });
    setForm({
      product_name: '',
      description: '',
      short_description: '',
      weight: '',
      dimensions: '',
      materials: '',
      price: '',
      category: '',
      tags: [],
      variants: [],
    });
    setVisibleModal('visibleAddProductModal');
    setErrValidate(false);
    setSelectedImages([]);
    setErrImg('');
    setErrVariants(false);
  }, []);
  useEffect(() => {
    if (isSuccessPostProduct) {
      closeModal();
    }
  }, [isSuccessPostProduct]);
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
              form.tags?.includes(t.name) ? 'text-gray' : 'text-darkGray'
            } capitalize`}
            value={t.name}
            disabled={form.tags?.includes(t.name)}
          >
            {t.name}
          </option>
        );
      })
    );
  }, [isSuccessTags, tagsData, form.tags]);
  return (
    <Modal>
      <section
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          transition: 'transform 0.2s ease',
          transform: state.visibleAddProductModal
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
              <p className='text-xl'>{t('add_product')}</p>
              <p className='text-sm'>{t('mess_add_product')}</p>
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
              id='img'
              title={`${t('img')}`}
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
                        name='file'
                        multiple
                        style={{ display: 'none' }}
                        ref={imgRef}
                        onChange={handleImagesSelect}
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
                    {selectedImages.length > 0 && (
                      <aside className='flex flex-row flex-wrap mt-4'>
                        {selectedImages.map((image, index) => {
                          return (
                            <div className='relative' key={index}>
                              <img
                                key={index}
                                className='inline-flex w-24 max-h-24 p-2 object-cover border border-gray rounded-md'
                                src={URL.createObjectURL(image)}
                                alt={`image ${index + 1}`}
                              />
                              <button
                                className='absolute top-1 right-1 border border-red text-red text-[10px] rounded-full p-[2px]'
                                aria-label='remove-img'
                                onClick={() => handleRemoveImage(index)}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          );
                        })}
                      </aside>
                    )}
                  </div>
                  {errImg && <ErrValidate message={errImg} />}
                </div>
              }
            />
            <Input
              id='product_name'
              title={`${t('product_name')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.product_name}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.product_name)}
            />
            <Input
              id='description'
              title={`${t('description')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.description}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.description)}
            />
            <Input
              id='short_description'
              title={`${t('short_description')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.short_description}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.short_description)}
            />
            <Input
              id='weight'
              title={`${t('weight')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.weight}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.weight)}
            />
            <Input
              id='dimensions'
              title={`${t('dimensions')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.dimensions}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.dimensions)}
            />
            <Input
              id='materials'
              title={`${t('materials')}`}
              type='text'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.materials}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateString(form.materials)}
            />
            <Input
              id='price'
              title={`${t('price')}`}
              type='number'
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              value={form.price}
              changeEvent={handleChangeForm}
              isErr={errValidate}
              isValidate={validateNumber(form.price)}
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
                  {form.tags?.length > 0 && (
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
                  )}
                </div>
              }
            />
            <Input
              id='variants'
              title={`${t('variants')}`}
              classGrand='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
              classLabel='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
              classParentInput='col-span-8 sm:col-span-4'
              classInput='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
              customChildren={
                <div className='w-full flex flex-col gap-[20px]'>
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-[8px]'>
                    <div className='flex flex-col gap-[4px]'>
                      <input
                        name='size'
                        className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
                        type='text'
                        placeholder={t('mess_add_size')}
                        value={variants.size}
                        onChange={handleVariantsChange}
                      />
                      {errVariants && !validateString(variants.size) && (
                        <ErrValidate message='validate_size' />
                      )}
                    </div>
                    <div className='flex flex-col gap-[4px]'>
                      <input
                        name='color'
                        className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
                        type='text'
                        placeholder={t('mess_add_color')}
                        value={variants.color}
                        onChange={handleVariantsChange}
                      />
                      {errVariants && !validateString(variants.color) && (
                        <ErrValidate message='validate_color' />
                      )}
                    </div>
                    <div className='flex flex-col gap-[4px]'>
                      <input
                        name='quantity'
                        className='w-full h-[48px] px-3 py-[4px] bg-white focus:bg-[#fff] border border-lightGray rounded focus:outline-none'
                        type='number'
                        placeholder={t('mess_add_quantity')}
                        value={variants.quantity}
                        onChange={handleVariantsChange}
                      />
                      {errVariants && !validateNumber(variants.quantity) && (
                        <ErrValidate message='validate_quantity' />
                      )}
                    </div>
                    <div className='w-full'>
                      <button
                        type='button'
                        className='w-full h-[48px] bg-green hover:bg-darkGreen transition-colors text-white rounded-md'
                        onClick={handleGenerateVariants}
                      >
                        {t('generate_variants')}
                      </button>
                    </div>
                  </div>
                  {errValidate && form.variants.length === 0 && (
                    <ErrValidate message='validate_variants' />
                  )}
                  {form.variants?.length > 0 && (
                    <div
                      className='w-full rounded-lg border border-lightGray
                      dark:border-lightGray
                      overflow-x-auto
                      overflow-y-hidden'
                    >
                      <table className='w-full whitespace-nowrap font-bold text-center'>
                        <thead className='text-xs font-semibold tracking-wide text-gray uppercase border-b border-lightGray dark:border-lightGray dark:text-gray dark:bg-darkGray'>
                          <tr>
                            <td className='px-2 py-1'>{t('size')}</td>
                            <td className='px-2 py-1'>{t('color')}</td>
                            <td className='px-2 py-1'>{t('quantity')}</td>
                            <td className='px-2 py-1'>{t('action')}</td>
                          </tr>
                        </thead>
                        <tbody>
                          {form.variants?.map((v, index) => {
                            return (
                              <tr key={index}>
                                <td className='px-2 py-1 uppercase'>
                                  {v.size}
                                </td>
                                <td className='px-2 py-1 capitalize'>
                                  {v.color}
                                </td>
                                <td className='px-2 py-1'>{v.quantity}</td>
                                <td className='px-2 py-1'>
                                  <button
                                    className='hover:text-red transition-colors'
                                    onClick={() => handleRemoveVariant(v.size)}
                                  >
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
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
                isLoadingPostProduct ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              func={closeModal}
              disabled={isLoadingPostProduct}
            />
            <ActionButton
              type='submit'
              title={`${t('add_banner')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center bg-lightGreen hover:bg-darkGreen text-white ${
                isLoadingPostProduct ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={isLoadingPostProduct}
            />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AddProductModal;
