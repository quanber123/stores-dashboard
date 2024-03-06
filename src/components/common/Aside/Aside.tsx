import React, { useMemo, useState } from 'react';
import { TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { catalog } from './data';
const Aside = () => {
  const [currRouter, setCurrRouter] = useState('dashboard');
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState<null | string>(null);
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
          <h3 className='font-bold'>{c.name}</h3>
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
                  - {d.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  });
  return (
    <aside className='fixed pt-[64px] w-[256px] h-full bg-white dark:bg-darkGray z-10'>
      {renderCatalog}
    </aside>
  );
};

export default Aside;
