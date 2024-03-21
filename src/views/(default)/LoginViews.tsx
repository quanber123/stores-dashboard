import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import loginImg from '@/assets/login-office-CQRYLh9n.jpeg';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {
  useAdminLoginMutation,
  useGetTokenQuery,
} from '@/services/redux/features/users';
const LoginViews = () => {
  const { t } = useTranslation('translation');
  const [_, setUser] = useAuth();
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState(
    localStorage.getItem('coza-store-dashboard-token')
  );
  const [
    login,
    { data: loginData, isSuccess: isSuccessLogin, isLoading: isLoadingLogin },
  ] = useAdminLoginMutation();
  const {
    data: adminData,
    isSuccess: isSuccessAdminData,
    isLoading: isLoadingAdminData,
  } = useGetTokenQuery(token, { skip: !token });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email.current && password.current) {
        await login({
          email: email.current.value,
          password: password.current.value,
        });
      }
    } catch (error: any) {
      console.error('Error submitting data:', error.message);
    }
  };
  useEffect(() => {
    if (isSuccessLogin) {
      localStorage.setItem('coza-store-dashboard-token', loginData.token);
      setToken(loginData?.token);
    }
  }, [isSuccessLogin, loginData]);
  useEffect(() => {
    if (isSuccessAdminData) {
      setUser(adminData);
      navigate('/dashboard', { replace: true });
    }
  }, [isSuccessAdminData, adminData]);
  return (
    <main className='bg-darkBlue min-h-[100vh] w-full flex justify-center items-center p-4 lg:p-6 overflow-hidden'>
      <section className='w-full grid lg:grid-cols-2 shadow-xl md:h-auto md:w-1/2 overflow-hidden rounded-lg'>
        <img
          className='lg:block hidden h-full'
          src={loginImg}
          alt='login-img'
          {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
          >)}
        />
        <div className='text-white flex flex-col gap-[40px] py-12 px-4 md:p-12 bg-darkGray'>
          <h1 className='text-4xl font-bold'>{t('login')}</h1>
          <form
            className='flex flex-col gap-[20px] border-b-2 border-white pb-16'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col gap-2 text-[#93a3af]'>
              <label htmlFor='email'>Email</label>
              <input
                className='bg-[#374151] px-2 py-3 rounded border border-[#6b7280]'
                type='email'
                placeholder='example@email.com'
                ref={email}
              />
            </div>
            <div className='flex flex-col gap-2 text-[#93a3af]'>
              <label htmlFor='password'>{t('password')}</label>
              <input
                className='bg-[#374151] px-2 py-3 rounded border border-[#6b7280]'
                type='password'
                placeholder='********'
                ref={password}
              />
            </div>
            <button
              className='h-[48px] bg-darkGreen hover:bg-green transition-colors py-[8px] px-[16px] rounded-lg'
              type='submit'
              disabled={isLoadingLogin || isLoadingAdminData}
            >
              {t('login')}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginViews;
