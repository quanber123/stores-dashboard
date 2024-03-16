import Modal from '@/Modal';
import { useContext } from 'react';
import useCloseModal, { ModalContext } from './context/modalContext';
const AlertModal = () => {
  const { state, setVisibleModal } = useContext(ModalContext);
  const [modalRef, handleClickOutside] = useCloseModal('visibleAlertModal');
  return (
    <Modal>
      <section
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          transition: 'all 0.2s linear',
        }}
        className={`fixed ${
          state.visibleAlertModal ? 'z-[9999] opacity-100' : '-z-50 opacity-0'
        } top-0 left-0 w-full h-full flex justify-center items-center`}
        onClick={handleClickOutside}
      >
        <div
          ref={modalRef}
          className='bg-white dark:bg-darkBlue text-darkGray dark:text-lightGray w-[576px] h-[282px] py-4 px-6 rounded-lg flex flex-col gap-[26px]'
        >
          <div className='px-8 pt-6 pb-4 flex flex-col items-center gap-[20px]'>
            <div className='text-3xl'>{state.visibleAlertModal?.icon}</div>
            <div className='w-full text-center flex flex-col gap-[12px]'>
              {state.visibleAlertModal?.question}
              <p className='text-sm'>{state.visibleAlertModal?.description}</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-[24px] text-sm'>
            <button
              style={{ transition: 'all 0.2s linear' }}
              className='h-[48px] bg-lightGray hover:bg-gray hover:text-white text-gray py-4 px-2 flex justify-center items-center rounded-md'
              onClick={() => setVisibleModal('visibleAlertModal')}
            >
              {state.visibleAlertModal?.messCancel}
            </button>
            <button
              style={{ transition: 'all 0.2s linear' }}
              className='h-[48px] text-white bg-lightGreen hover:bg-darkGreen py-4 px-2 flex justify-center items-center rounded-md'
              onClick={state.visibleAlertModal?.acceptFunc}
              disabled={state.visibleAlertModal?.loading}
            >
              {state.visibleAlertModal?.messAccept}
            </button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default AlertModal;
