export const allowImage = ['.jpg', '.jpeg', '.png', '.webp'];
export function validateImage(file: File | null) {
  if (file === null) return false;
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  return allowedExtensions.includes(extension);
}
export const validateDiscount = (discount: string | number) => {
  if (Number(discount) > 0 && Number(discount) <= 100) {
    return true;
  } else {
    return false;
  }
};

export const validateNumber = (number: string | number) => {
  return Number(number) > 0 ? true : false;
};

export const validateString = (str: string) => {
  return str?.length > 0 ? true : false;
};

export const validateArr = (arr: any[]) => {
  return arr?.length > 0 ? true : false;
};
