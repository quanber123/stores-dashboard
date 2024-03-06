import { TiThLargeOutline, TiCompass } from 'react-icons/ti';
import { TbBrandReact } from 'react-icons/tb';
import { LuUsers } from 'react-icons/lu';
import { MdOutlineSettings } from 'react-icons/md';

export const catalog = [
  {
    link: 'dashboard',
    name: 'DashBoard',
    icon: <TiThLargeOutline className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
  {
    link: '',
    name: 'Catalog',
    icon: <TbBrandReact className='text-xl' />,
    isDropdown: true,
    dropdown: [
      {
        link: 'products',
        name: 'Products',
      },
      {
        link: 'categories',
        name: 'Categories',
      },
      {
        link: 'tags',
        name: 'Tags',
      },
      {
        link: 'blogs',
        name: 'Blogs',
      },
      {
        link: 'coupons',
        name: 'Coupons',
      },
    ],
  },
  {
    link: 'customers',
    name: 'Customers',
    icon: <LuUsers className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
  {
    link: 'orders',
    name: 'Orders',
    icon: <TiCompass className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
  {
    link: 'settings',
    name: 'Settings',
    icon: <MdOutlineSettings className='text-xl' />,
    isDropdown: false,
    dropdown: [],
  },
];
