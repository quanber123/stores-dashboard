type Props = {
  img?: any;
  message: string;
};
const NotFoundItem: React.FC<Props> = ({ img, message }) => {
  return (
    <section className='w-full rounded-lg border border-lightGray dark:border-darkGray overflow-x-auto p-8 flex flex-col items-center gap-[20px]'>
      {img}
      <p className='font-bold text-darkGray dark:text-gray'>{message}</p>
    </section>
  );
};

export default NotFoundItem;
