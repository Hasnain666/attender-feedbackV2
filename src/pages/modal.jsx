import React from 'react';
import './modal.css'; // Import the CSS file for styling the modal

const Modal = ({ children, closeModal }) => {
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
