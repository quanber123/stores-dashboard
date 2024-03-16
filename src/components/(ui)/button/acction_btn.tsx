import React from 'react';
type Props = {
  type: 'submit' | 'button' | 'reset';
  title: string;
  style: React.CSSProperties;
  className: string;
  func?: any;
  disabled?: boolean;
};
const ActionButton: React.FC<Props> = ({
  type,
  title,
  style,
  className,
  func,
  disabled,
}) => {
  return (
    <button
      type={type}
      style={style}
      className={className}
      onClick={func}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ActionButton;
