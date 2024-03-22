import logo from '@/assets/logo-01.png.webp';
import darkLogo from '@/assets/logo-02.png.webp';
import { useAuth } from '@/context/AuthProvider';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaRegSun,
  FaRegMoon,
  FaRegBell,
  FaArrowRightToBracket,
} from 'react-icons/fa6';
import { TiThLargeOutline } from 'react-icons/ti';
import { MdOutlineSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
type Props = {
  toggleAside: boolean;
  handleToggle: () => void;
};
const Header: React.FC<Props> = ({ toggleAside, handleToggle }) => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const [currTheme, setTheme] = useState(
    localStorage.getItem('cozastore-theme') || 'light'
  );
  const [user, setUser] = useAuth();
  const [userDropdown, setUserDropdown] = useState(false);
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
  const handleRedirect = (link: string) => {
    if (link === 'logout') {
      localStorage.removeItem('coza-store-dashboard-token');
      setUser(null);
    } else {
      navigate(`/${link}`);
      setUserDropdown(false);
    }
  };
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
          <div className='relative'>
            <button
              className='w-[28px] h-[28px] rounded-full overflow-hidden order-2 lg:order-3'
              aria-label='user'
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <img
                className='w-full h-full'
                src={user?.image}
                alt={user?.name}
              />
            </button>
            <div
              style={{ transition: 'all 0.2s ease' }}
              className={`w-[224px] absolute right-0 rounded-md p-4 bg-white dark:bg-darkGray text-darkGray dark:text-lightGray flex flex-col gap-[12px] font-bold shadow-xl overflow-hidden ${
                userDropdown
                  ? 'z-[10000] opacity-100 h-[128px]'
                  : '-z-50 opacity-0 h-0'
              }`}
            >
              <button
                className='flex items-center gap-[20px]'
                onClick={() => handleRedirect('dashboard')}
              >
                <TiThLargeOutline />
                <p>{t('dashboard')}</p>
              </button>
              <button
                className='flex items-center gap-[20px]'
                onClick={() => handleRedirect('edit-profile')}
              >
                <MdOutlineSettings />
                <p>{t('edit_profile')}</p>
              </button>
              <button
                className='flex items-center gap-[20px]'
                onClick={() => handleRedirect('logout')}
              >
                <FaArrowRightToBracket />
                <p>{t('logout')}</p>
              </button>
            </div>
          </div>
          <button className='hidden lg:block relative text-green order-3 lg:order-2'>
            <span className='absolute -top-1/2 -left-1/3 bg-red text-white w-[20px] h-[20px] flex items-center justify-center rounded-full'>
              1
            </span>
            <FaRegBell className='text-xl' />
          </button>
          <div className='lg:hidden flex items-center gap-[10px] order-4'>
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
