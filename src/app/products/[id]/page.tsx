'use client'
import React, { use, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchProductById, productSelector } from '@/features/redux/reducers/productSlice';
import { fetchProductsByCategory, categorySelector } from '@/features/redux/reducers/categorySlice';
import { addToCart } from '@/features/redux/reducers/cartSlice';
import { AppDispatch } from '@/features/redux/store';
import { Navbar } from '@/features/header';
import ProductInfo from '@/features/product/productInfo';
import QuantityControl from '@/features/product/quantityControl';
import SpecialRequest from '@/features/product/specialReq';
import { CategoryCard } from '@/features/category';
import { toast } from 'react-toastify';

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { product, status, error } = useSelector(productSelector);
  const { products: categoryProducts, status: categoryStatus } = useSelector(categorySelector);

  const { id: productIdString } = use(params);
  const productId = parseInt(productIdString, 10);

  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');

  // Ref for the auto-scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNaN(productId)) {
      dispatch(fetchProductById(productId));
    } else {
      console.error('No valid productId found in params');
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.category) {
      dispatch(fetchProductsByCategory(product.category));
    }
  }, [dispatch, product?.category]);

  // Automatically scroll the container horizontally
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1; // Adjust the number of pixels to scroll each step
    const scrollInterval = 20; // Time (ms) between scroll steps
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth; // Calculate max scroll

    const intervalId = setInterval(() => {
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        // If reached the end, reset to the start
        scrollContainer.scrollLeft = 0;
      } else {
        // Scroll by the defined step
        scrollContainer.scrollLeft += scrollStep;
      }
    }, scrollInterval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [categoryProducts]);

  if (status === 'loading' || categoryStatus === 'loading') {
    return <p>Loading product details...</p>;
  }
  if (status === 'failed' || categoryStatus === 'failed') {
    return <p>Error: {error}</p>;
  }

  const recommendedProducts = categoryProducts[product.category]?.filter(p => p.id !== productId).slice(0, 4) || [];

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.title} has been added to your cart!`);
    router.push('/cart');
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
          <button onClick={handleAddToCart} className='bg-primary text-white text-nowrap rounded-full py-2 px-8 mt-4'>
            Add to Cart
          </button>
        </div>
        <div>
          <SpecialRequest specialRequest={specialRequest} setSpecialRequest={setSpecialRequest} />
        </div>

        {/* Recommended Products Section */}
        <div className='recommended-products mt-8'>
          <h3 className='text-xl py-2 font-bold'>Recommended Products</h3>
          <div
            ref={scrollContainerRef}
            className='auto-scroll grid grid-cols-2 gap-4 lg:grid-cols-2 sm:grid-cols-1'
     // Ensure items are in one line for horizontal scrolling
          >
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map(recommendedProduct => (
                <CategoryCard
                  key={recommendedProduct.id}
                  id={recommendedProduct.id}
                  title={recommendedProduct.title}
                  image={recommendedProduct.image}
                  price={recommendedProduct.price}
                  onClick={() => router.push(`/products/${recommendedProduct.id}`)}
                />
              ))
            ) : (
              <p>No recommended products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
