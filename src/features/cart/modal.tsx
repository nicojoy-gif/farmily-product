// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onContinueShopping: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, onContinueShopping }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-between">
          <button 
            onClick={onContinueShopping} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
