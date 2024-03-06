import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import Aside from './components/common/Aside/Aside';

const App = () => {
  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Header />
      <Aside />
      <Outlet />
    </Suspense>
  );
};

export default App;
