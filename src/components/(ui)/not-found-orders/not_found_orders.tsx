const NotFoundOrders = ({ message }: { message: string }) => {
  return (
    <section className='w-full rounded-lg border border-lightGray dark:border-darkGray overflow-x-auto p-8 flex flex-col items-center gap-[20px]'>
      <svg
        className='text-red text-6xl'
        stroke='currentColor'
        fill='currentColor'
        stroke-width='0'
        viewBox='0 0 512 512'
        height='1em'
        width='1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
      </svg>
      <p className='font-bold text-darkGray dark:text-gray'>{message}</p>
    </section>
  );
};

export default NotFoundOrders;
