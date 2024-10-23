// components/ProductDetails/QuantityControl.tsx
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface QuantityControlProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, setQuantity }) => {
  return (
    <div className='flex items-center gap-12'>
      <div className='flex items-center rounded-full bg-secondary mt-4'>
        <button 
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} 
          className='text-new p-3 rounded'><FaMinus /></button>
        <span className='text-new font-bold text-xl mx-2'>{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)} 
          className='text-new p-3 rounded'><FaPlus /></button>
      </div>
    </div>
  );
};

export default QuantityControl;
