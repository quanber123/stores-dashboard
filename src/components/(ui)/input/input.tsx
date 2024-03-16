import React from 'react';
import ErrValidate from '../err-validate/err-validate';
type Props = {
  id: string;
  title: string;
  type?: string;
  classGrand?: string;
  classLabel?: string;
  classParentInput?: string;
  classInput?: string;
  customChildren?: any;
  value?: string | number;
  changeEvent?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isErr?: boolean;
  isValidate?: boolean;
};
const Input: React.FC<Props> = ({
  id,
  title,
  type,
  classGrand,
  classLabel,
  classParentInput,
  classInput,
  customChildren,
  value,
  changeEvent,
  isErr,
  isValidate,
}) => {
  return (
    <div className={classGrand}>
      <label className={classLabel} htmlFor={id}>
        {title}
      </label>
      <div className={classParentInput}>
        {customChildren ? (
          customChildren
        ) : (
          <div className='flex flex-col gap-[4px]'>
            <input
              id={id}
              name={id}
              className={classInput}
              type={type}
              placeholder={title}
              value={value}
              onChange={changeEvent}
            />
            {isErr && !isValidate && <ErrValidate message={id} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
