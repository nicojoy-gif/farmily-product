// components/ProductDetails/ProductDetails.tsx
'use client';
import { fetchProductById, productSelector } from '@/features/redux/reducers/productSlice';
import { AppDispatch } from '@/features/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react'; // Import use for unwrapping params
import { Navbar } from '@/features/header';
import ProductInfo from '@/features/product/productInfo';
import QuantityControl from '@/features/product/quantityControl';
import SpecialRequest from '@/features/product/specialReq';
import { addToCart } from '@/features/redux/reducers/cartSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface ProductDetailsProps {
  params: Promise<{
    id: string; // Ensure this matches the dynamic segment in your URL
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, status, error } = useSelector(productSelector);
const router = useRouter()
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
    dispatch(addToCart({ product, quantity })); // Dispatch addToCart
    toast.success(`${product.title} has been added to your cart!`); // Notify user
    router.push('/cart'); // Navigate to cart page
  };
  return (
    <div>
      <Navbar />
      <div className='max-w-3xl my-5 px-5 mx-auto'>
        <ProductInfo 
          title={product.title} 
          category={product.category} 
          description={product.description} 
          price={product.price} 
          image={product.image} 
        />
        <div className='py-2 flex items-center lg:gap-12 gap-6'>
          <QuantityControl quantity={quantity} setQuantity={setQuantity} />
          <button 
            onClick={handleAddToCart} 
            className='bg-primary text-white text-nowrap rounded-full py-2 px-8 mt-4'>
            Add to Cart
          </button>
          </div>
          <div>
          <SpecialRequest
            specialRequest={specialRequest} 
            setSpecialRequest={setSpecialRequest} 
          />
        </div>

        {/* Recommended Products Section */}
        <div className='recommended-products mt-8'>
          <h3 className='text-xl py-2 font-bold'>Recommended Products</h3>
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
