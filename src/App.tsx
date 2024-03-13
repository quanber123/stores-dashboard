import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import Aside from './components/common/Aside/Aside';
import { useGetStatusQuery } from './services/redux/features/figures';
import { useDispatch } from 'react-redux';
import { setStatus } from './services/redux/slice/statusSlice';
const App = () => {
  const dispatch = useDispatch();
  const { data: statusData, isSuccess: isSuccessStatus } =
    useGetStatusQuery(null);
  useEffect(() => {
    dispatch(setStatus(statusData));
  }, [isSuccessStatus]);
  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Header />
      <Aside />
      <Outlet />
    </Suspense>
  );
};

export default App;
