import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import Aside from './components/common/Aside/Aside';
import { useGetStatusQuery } from './services/redux/features/figures';
import { useDispatch } from 'react-redux';
import { setStatus } from './services/redux/slice/statusSlice';
import LoadingViews from './views/(default)/LoadingViews';
const AlertModal = lazy(() => import('@/components/modal/alert_modal'));
const App = () => {
  const dispatch = useDispatch();
  const { data: statusData, isSuccess: isSuccessStatus } =
    useGetStatusQuery(null);
  const [toggleAside, setToggleAside] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setToggleAside(true);
      } else {
        setToggleAside(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleToggle = useCallback(() => {
    setToggleAside((prevState) => (prevState = !prevState));
  }, [toggleAside]);
  useEffect(() => {
    if (isSuccessStatus) {
      dispatch(setStatus(statusData));
    }
  }, [isSuccessStatus, statusData]);
  return (
    <Suspense fallback={<LoadingViews />}>
      <Header toggleAside={toggleAside} handleToggle={handleToggle} />
      <Aside
        toggleAside={toggleAside}
        closeAside={() => setToggleAside(false)}
      />
      <main className='w-full h-full lg:ml-[256px] mt-[64px] py-8 px-4 lg:px-16 flex flex-col gap-[40px] dark:bg-darkBlue text-darkGray dark:text-white overflow-y-scroll'>
        <Outlet />
      </main>
      <AlertModal />
    </Suspense>
  );
};

export default App;
