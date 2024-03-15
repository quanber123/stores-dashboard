import { intlFormat } from 'date-fns';
export const formatDate = (date: string | null, lang: string) => {
  let currLang: string = '';

  if (lang === 'vie') {
    currLang = 'vi';
  } else if (lang === 'eng') {
    currLang = 'en-US';
  }

  const result = date
    ? intlFormat(
        new Date(date),
        { year: 'numeric', month: 'long', day: 'numeric' },
        { locale: currLang }
      )
    : '';
  return result;
};

export const formatTime = (date: string | null, lang: string) => {
  let currLang: string = '';

  if (lang === 'vie') {
    currLang = 'vi';
  } else if (lang === 'eng') {
    currLang = 'en-US';
  }

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
        { locale: currLang }
      )
    : '';
  return result;
};
