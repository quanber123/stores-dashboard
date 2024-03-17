import { formatDate } from '@/services/utils/format';
import { User } from '@/types/type';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearchPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
  customer: User;
};
const Customers: React.FC<Props> = ({ customer }) => {
  const { i18n } = useTranslation('translation');
  const navigate = useNavigate();
  const { id, email, name, oauthProvider, created_at } = customer;
  return (
    <tr className='text-center text-gray text-sm border-t border-b border-lightGray dark:border-darkGray font-bold'>
      <td className='p-4'>{id}</td>
      <td className='p-4'>{formatDate(created_at, i18n.language)}</td>
      <td className='p-4'>{name}</td>
      <td className='p-4'>{email ? email : 'null'}</td>
      <td className='p-4 capitalize'>
        {oauthProvider ? oauthProvider : 'default'}
      </td>
      <td className='p-4'>
        <button
          className='m-auto text-lg flex justify-center items-center hover:text-green transition-colors'
          aria-label='show'
          onClick={() => navigate(`${id}`)}
        >
          <FaSearchPlus />
        </button>
      </td>
    </tr>
  );
};

export default Customers;
