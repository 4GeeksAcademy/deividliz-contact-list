import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }else {

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  )
}
};

export default Modal;