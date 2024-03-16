import React from 'react';
import ReactDOM from 'react-dom';
function Modal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.getElementById('modal')!);
}

export default Modal;
