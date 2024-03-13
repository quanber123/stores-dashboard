import { intlFormat } from 'date-fns';
export const formatDate = (date: string | null) => {
  const result = date
    ? intlFormat(
        new Date(date),
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
        {
          locale: 'en-Us',
        }
      )
    : '';
  return result;
};
export const formatTime = (date: string | null) => {
  const result = date
    ? intlFormat(
        new Date(date),
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        },
        {
          locale: 'en-Us',
        }
      )
    : '';
  return result;
};
