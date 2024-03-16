import { useCallback, useState } from 'react';
import { TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { catalog } from './data';
import { useTranslation } from 'react-i18next';
import engFlag from '@/assets/united-kingdom.png';
import vieFlag from '@/assets/vietnam.png';
type Props = {
  toggleAside: boolean;
};
const Aside: React.FC<Props> = ({ toggleAside }) => {
  const { t, i18n } = useTranslation('translation');
  const [currRouter, setCurrRouter] = useState('dashboard');
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState<null | string>(null);
  const handleChangeLang = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      window.localStorage.setItem('cozastore-lang', lang);
    },
    [i18n]
  );
  const handleRouter = (isDropdown: boolean, link: string) => {
    if (isDropdown) {
      if (link === dropdown) {
        setDropdown(null);
      } else {
        setDropdown(link);
      }
    } else {
      setCurrRouter(link);
      navigate(link);
    }
  };
  const renderCatalog = catalog.map((c) => {
    return (
      <div
        key={c.name}
        className={`relative flex flex-col justify-center gap-[20px] py-4 px-8 ${
          c.link === currRouter
            ? 'dark:text-green text-green'
            : 'dark:text-lightGray'
        } cursor-pointer`}
        onClick={() => handleRouter(c.isDropdown, c.link)}
      >
        {currRouter === c.link && (
          <span
            className={`absolute left-0 h-full border-green border-2 rounded-tr-[8px] rounded-br-[8px]`}
          ></span>
        )}
        <div className='flex items-center gap-[20px]'>
          {c.icon}
          <h3 className='font-bold'>{t(`${c.name}`)}</h3>
          {c.dropdown.length > 0 && (
            <div
              style={{ transition: 'all 0.1s linear' }}
              className={`${dropdown === c.link ? 'rotate-90' : 'rotate-0'}`}
            >
              <TbChevronRight className='font-bold text-xl' />
            </div>
          )}
        </div>
        {c.dropdown.length > 0 && dropdown === c.link && (
          <ul className='dark:bg-darkBlue rounded-[6px] px-4 py-2 text-sm flex flex-col gap-[10px]'>
            {c.dropdown.map((d) => {
              return (
                <li
                  className='flex text-darkGray dark:text-lightGray opacity-80 hover:opacity-100 transition-opacity'
                  key={d.name}
                  onClick={() => handleRouter(false, d.link)}
                >
                  - {t(`${d.name}`)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  });
  return (
    <aside
      style={{
        transition: 'transform 0.2s linear',
        transform: toggleAside ? 'translateX(0)' : 'translateX(-100%)',
      }}
      className={`fixed pt-[64px] w-full lg:w-[256px] h-full bg-white dark:bg-darkGray z-10 overflow-hidden`}
    >
      {renderCatalog}
      <div className='flex flex-col gap-[20px] py-4 px-8 text-darkGray dark:text-white font-bold'>
        {i18n.language === 'vie' && (
          <button
            className='flex items-center gap-[20px]'
            onClick={() => handleChangeLang('eng')}
          >
            <img className='w-[20px] h-[20px]' src={engFlag} alt='eng-flag' />
            <p>{t('eng')}</p>
          </button>
        )}
        {i18n.language === 'eng' && (
          <button
            className='flex items-center gap-[20px]'
            onClick={() => handleChangeLang('vie')}
          >
            <img className='w-[20px] h-[20px]' src={vieFlag} alt='vie-flag' />
            <p>{t('vie')}</p>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Aside;
