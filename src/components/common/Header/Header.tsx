import logo from '@/assets/logo-01.png.webp';
import darkLogo from '@/assets/logo-02.png.webp';
import { useAuth } from '@/context/AuthProvider';
import { useCallback, useEffect, useState } from 'react';
import { FaRegSun, FaRegMoon, FaRegBell } from 'react-icons/fa6';
type Props = {
  toggleAside: boolean;
  handleToggle: () => void;
};
const Header: React.FC<Props> = ({ toggleAside, handleToggle }) => {
  const [currTheme, setTheme] = useState(
    localStorage.getItem('cozastore-theme') || 'light'
  );
  const [user] = useAuth();
  const toggleTheme = useCallback((theme: string) => {
    localStorage.setItem('cozastore-theme', theme);
    setTheme(theme);
  }, []);
  useEffect(() => {
    if (currTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currTheme]);
  return (
    <header className='fixed w-full h-[64px] bg-white dark:bg-darkGray z-20'>
      <div className='h-full flex justify-between items-center py-4 pl-8 pr-8 lg:pr-32'>
        <img
          src={currTheme === 'dark' ? darkLogo : logo}
          alt='cozastore-logo'
        />
        <nav className='flex items-center gap-[10px] lg:gap-[20px]'>
          <button className='flex items-center gap-[20px] text-xl text-green'>
            {currTheme === 'light' && (
              <FaRegSun onClick={() => toggleTheme('dark')} />
            )}
            {currTheme === 'dark' && (
              <FaRegMoon onClick={() => toggleTheme('light')} />
            )}
          </button>
          <button className='hidden lg:block relative text-green'>
            <span className='absolute -top-1/2 -left-1/3 bg-red text-white w-[20px] h-[20px] flex items-center justify-center rounded-full'>
              1
            </span>
            <FaRegBell className='text-xl' />
          </button>
          <button
            className='hidden lg:block w-[32px] h-[32px] rounded-full overflow-hidden'
            aria-label='user'
          >
            <img className='w-full h-full' src={user.image} alt={user.name} />
          </button>
          <div className='lg:hidden flex items-center gap-[10px]'>
            <div
              className={`relative m-auto w-[24px] h-[42px] cursor-pointer`}
              onClick={handleToggle}
            >
              <span
                className={`bars before:bg-darkGray dark:before:bg-lightGreen ${
                  toggleAside ? 'active' : ''
                }`}
              ></span>
              <span
                className={`bars before:bg-darkGray dark:before:bg-lightGreen ${
                  toggleAside ? 'active' : ''
                }`}
              ></span>
              <span
                className={`bars before:bg-darkGray dark:before:bg-lightGreen ${
                  toggleAside ? 'active' : ''
                }`}
              ></span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
