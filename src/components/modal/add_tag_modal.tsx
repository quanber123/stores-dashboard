import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Modal from '@/Modal';
import ActionButton from '../(ui)/button/acction_btn';
import useCloseModal, { ModalContext } from './context/modalContext';
import { validateString } from '@/services/utils/validate';
import ErrValidate from '../(ui)/err-validate/err-validate';
import { usePostTagMutation } from '@/services/redux/features/label';
const AddTagModal = () => {
  const { t } = useTranslation('translation');
  const [errValidate, setErrValidate] = useState(false);
  const { state, setVisibleModal } = useContext(ModalContext);
  const [modalRef, handleClickOutside] = useCloseModal('visibleAddTagModal');
  const tagRef = useRef<HTMLInputElement | null>(null);
  const [postTag, { isLoading: isLoadingTag, isSuccess: isSuccessTag }] =
    usePostTagMutation();
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (tagRef.current && validateString(tagRef.current?.value as string)) {
        setErrValidate(false);
        await postTag({ name: tagRef.current.value });
      } else {
        setErrValidate(true);
      }
    },
    [tagRef.current, postTag]
  );
  const closeModal = useCallback(() => {
    if (tagRef.current) {
      tagRef.current.value = '';
    }
    setVisibleModal('visibleAddTagModal');
    setErrValidate(false);
  }, [setVisibleModal]);
  useEffect(() => {
    if (isSuccessTag) {
      closeModal();
    }
  }, [isSuccessTag]);
  return (
    <Modal>
      <section
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          transition: 'transform 0.2s ease',
          transform: state.visibleAddTagModal
            ? 'translateX(0)'
            : 'translateX(100%)',
        }}
        className='fixed top-0 right-0 z-[9999] w-full h-full text-darkGray dark:text-lightGray overflow-y-auto flex justify-center items-center'
        onClick={handleClickOutside}
      >
        <form
          ref={modalRef as MutableRefObject<HTMLFormElement>}
          className='m-auto h-1/2'
          onSubmit={handleSubmit}
        >
          <div className='bg-white dark:bg-darkBlue p-6 flex justify-between items-center gap-[20px]'>
            <div className='flex flex-col gap-[8px]'>
              <p className='text-xl'>{t('add_tag')}</p>
              <p className='text-sm'>{t('mess_add_tag')}</p>
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
          <div className='bg-white dark:bg-darkBlue p-6 flex flex-col gap-[12px]'>
            <div className='flex flex-col gap-[12px]'>
              <label
                className='block text-gray-800 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium'
                htmlFor='tag'
              >
                {t('tags')}
              </label>
              <input
                ref={tagRef}
                className='text-darkGray border-2 border-lightGray dark:border-gray rounded-md px-4 py-2'
                type='text'
                placeholder={t('tags')}
              />
            </div>
            {errValidate &&
              !validateString(tagRef.current?.value as string) && (
                <ErrValidate message={'tags'} />
              )}
          </div>
          <div className='bg-white dark:bg-darkBlue p-6 flex justify-between items-center gap-[20px] text-sm'>
            <ActionButton
              type='button'
              title={`${t('cancel_btn')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center border border-lightGray dark:border-darkGray bg-[#fff] hover:bg-[#FCC8D1] text-red dark:bg-darkGray dark:text-gray dark:hover:bg-darkGray dark:hover:text-darkRed ${
                isLoadingTag ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              func={closeModal}
              disabled={isLoadingTag}
            />
            <ActionButton
              type='submit'
              title={`${t('add_tag')}`}
              style={{ transition: 'all 0.2s linear' }}
              className={`w-full h-[48px] py-2 px-4 rounded-md flex justify-center items-center bg-lightGreen hover:bg-darkGreen text-white ${
                isLoadingTag ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={isLoadingTag}
            />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AddTagModal;
