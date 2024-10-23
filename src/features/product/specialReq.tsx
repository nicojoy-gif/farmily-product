// components/ProductDetails/SpecialRequest.tsx
import React from 'react';

interface SpecialRequestProps {
  specialRequest: string;
  setSpecialRequest: (request: string) => void;
}

const SpecialRequest: React.FC<SpecialRequestProps> = ({ specialRequest, setSpecialRequest }) => {
  return (
    <div className='mt-4'>
      <label htmlFor='specialRequest' className='block text-surface-800 text-lg font-bold mb-1'>
        Special Request <span className='text-surface-600 text-md'>(optional)</span>
      </label>
      <textarea 
        id='specialRequest' 
        value={specialRequest} 
        onChange={(e) => setSpecialRequest(e.target.value)} 
        className='border resize-none bg-surface-200 rounded p-2 w-full' 
        rows={6} 
        placeholder='Any special instructions?' />
    </div>
  );
};

export default SpecialRequest;
