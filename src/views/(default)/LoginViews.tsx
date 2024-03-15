import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import loginImg from '@/assets/login-office-CQRYLh9n.jpeg';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
const LoginViews = () => {
  const { t } = useTranslation('translation');
  const [user, setUser] = useAuth();
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.current && password.current) {
      const admin = {
        email: email.current.value,
        password: email.current.value,
      };
      setUser(admin);
      navigate('/dashboard', { replace: true });
    }
    // try {
    //   if (email.current && password.current) {
    //     setLoading(true);
    //     const response = await fetch('', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(admin),
    //     });
    //     if (!response.ok) {
    //       throw new Error('Failed to submit data');
    //     }
    //     setLoading(false);
    //   }
    // } catch (error: any) {
    //   console.error('Error submitting data:', error.message);
    // }
  };
  return (
    <main className='bg-darkBlue min-h-[100vh] w-full flex justify-center items-center p-6 overflow-hidden'>
      <section className='grid md:grid-cols-2 shadow-xl h-32 md:h-auto md:w-1/2 overflow-hidden rounded-lg'>
        <img
          src={loginImg}
          alt='login-img'
          {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
          >)}
        />
        <div className='text-white flex flex-col gap-[40px] p-12 bg-darkGray'>
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
              disabled={loading}
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
