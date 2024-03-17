import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
} from 'react';
type AlertModalState = {
  icon: any;
  question: any;
  description: string;
  messCancel: string;
  messAccept: string;
  acceptFunc: () => void;
  loading: boolean;
};
// type ConfirmModalState = {
//   message: string;
//   function: () => void;
// };
type InitialState = {
  visibleAddCouponModal: boolean;
  visibleAlertModal: AlertModalState;
  visibleAddBannerModal: boolean;
  visibleAddCategoryModal: boolean;
};
const SET_VISIBLE_MODAL = 'SET_VISIBLE_MODAL';
const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL';
const reducer = (state: InitialState, action: any) => {
  const currentModal = action.payload?.modal;
  const resetState = {} as InitialState;
  switch (action.type) {
    case SET_VISIBLE_MODAL:
      if (typeof action.payload?.modal === 'object') return currentModal;
      if (currentModal === null) return { ...resetState };
      return {
        ...resetState,
        [currentModal]: !state[currentModal as keyof InitialState],
      };
    case CLOSE_ALL_MODAL:
      return { ...resetState };

    default:
      return state;
  }
};
const initialState = {} as InitialState;
export type InitialModalContext = {
  state: InitialState;
  setVisibleModal: (modal: any) => void;
  closeAllModal: () => void;
};
export const ModalContext = createContext({} as InitialModalContext);

export const ModalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setVisibleModal = useCallback((modal: any) => {
    dispatch({ type: SET_VISIBLE_MODAL, payload: { modal } });
  }, []);
  const closeAllModal = useCallback(() => {
    dispatch({ type: CLOSE_ALL_MODAL });
  }, []);
  const contextValue = {
    state,
    setVisibleModal,
    closeAllModal,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const useCloseModal = (modal: any) => {
  const { setVisibleModal, closeAllModal } = useContext(ModalContext);
  const modalRef = useRef<any | null>(null);

  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setVisibleModal(modal);
      }
    },
    [setVisibleModal, modal]
  );

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeAllModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return [modalRef, handleClickOutside] as const;
};

export default useCloseModal;
