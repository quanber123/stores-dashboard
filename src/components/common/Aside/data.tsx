import { TiThLargeOutline, TiCompass } from 'react-icons/ti';
import { TbBrandReact } from 'react-icons/tb';
import { LuUsers } from 'react-icons/lu';
import { MdOutlineSettings } from 'react-icons/md';
export const catalog = [
  {
    link: 'dashboard',
    name: 'dashboard',
    icon: <TiThLargeOutline className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
  {
    link: 'catalog',
    name: 'catalog',
    icon: <TbBrandReact className='text-xl' />,
    isDropdown: true,
    dropdown: ['banners', 'products', 'categories', 'tags', 'blogs', 'coupons'],
  },
  {
    link: 'customers',
    name: 'customers',
    icon: <LuUsers className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
  {
    link: 'orders',
    name: 'orders',
    icon: <TiCompass className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
  {
    link: 'settings',
    name: 'settings',
    icon: <MdOutlineSettings className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
];
