'use client';
import { fetchProductById, productSelector } from '@/features/redux/reducers/productSlice';
import { AppDispatch } from '@/features/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react'; // Import use for unwrapping params
import { Navbar } from '@/features/header';
import { FaMinus, FaPlus } from 'react-icons/fa';
// Import any required components or styles

interface ProductDetailsProps {
  params: Promise<{
    id: string; // Ensure this matches the dynamic segment in your URL
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, status, error } = useSelector(productSelector);

  // Unwrap the params using React.use()
  const { id: productIdString } = use(params); // Unwrap to get productId
  const productId = parseInt(productIdString, 10); // Convert string to number

  // State for quantity and special request
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [specialRequest, setSpecialRequest] = useState(''); // For special requests

  useEffect(() => {
    if (!isNaN(productId)) {
      dispatch(fetchProductById(productId));
    } else {
      console.error('No valid productId found in params');
    }
  }, [dispatch, productId]);

  if (status === 'loading') {
    return <p>Loading product details...</p>;
  }
  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  // Handler for adding to cart
  const handleAddToCart = () => {
    console.log(`Adding to cart: ${product.title}, Quantity: ${quantity}, Special Request: ${specialRequest}`);
    // Add logic to dispatch add to cart action
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-3xl my-5 px-5 mx-auto'>
        <div className='product-background rounded-xl lg:w-1/2 lg:h-1/2 w-full h-full p-6 flex-col flex'>
          <div className='product flex justify-center items-center'>
            <div>
              <img src={product.image} className='h-48 w-48' alt={product.title} />
            </div>
          </div>
          <div className='flex flex-col justify-start items-start py-2'>
            <h2 className='capitalize text-dark font-bold text-lg'>{product.category}</h2>
            <p className='text-surface-600 font-medium'>{product.title}</p>
          </div>
        </div>
        <div className='p-4'>
          <h2 className='capitalize text-dark font-bold text-xl'>{product.title}</h2>
          <p className='py-2 text-primary'>{product.description}</p>
          <p className='text-dark-400 font-medium'>Starting Price: ${product.price} (5pcs)</p>
          
          {/* Quantity Control */}
          <div className='flex items-center gap-12'>
          <div className='flex items-center rounded-full bg-secondary mt-4'>
            <button 
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} 
              className='text-new  p-3 rounded'><FaMinus /></button>
            <span className=' text-new font-bold text-xl mx-2'>{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className='text-new   p-3 rounded'><FaPlus  /></button>
          </div>
            {/* Add to Cart Button */}
            <button 
            onClick={handleAddToCart} 
            className='bg-primary text-white rounded-full py-2 px-8 mt-4'>
            Add to Cart
          </button>
          </div>
          
          {/* Special Request Textarea */}
          <div className='mt-4'>
            <label htmlFor='specialRequest' className='block text-surface-800 text-lg font-bold mb-1'>Special Request <span className='text-surface-600 text-md'>(optional)</span></label>
            <textarea 
              id='specialRequest' 
              value={specialRequest} 
              onChange={(e) => setSpecialRequest(e.target.value)} 
              className='border resize-none bg-surface-200 rounded p-2 w-full' 
              rows={6} 
              placeholder='Any special instructions?' />
          </div>

        
        </div>

        {/* Recommended Products Section */}
        <div className='recommended-products mt-8'>
          <h3 className='text-xl font-bold'>Recommended Products</h3>
          {/* Here, you would map through your recommended products */}
          <div className='grid grid-cols-2 gap-4'>
            {/* Example of recommended products (you should replace this with real data) */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className='border p-4 rounded'>
                <h4 className='font-semibold'>Recommended Product {item}</h4>
                <p>Product details go here.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
