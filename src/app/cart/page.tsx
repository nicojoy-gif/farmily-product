'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/features/redux/store';
import { fetchCartData, cartSelector, removeFromCart, updateCartQuantity } from '@/features/redux/reducers/cartSlice';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/features/header';
import Pagination from '@/features/cart/pagination';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items, status, error } = useSelector(cartSelector);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 4 items per page

  useEffect(() => {
    dispatch(fetchCartData()); // Fetch cart data when the component mounts
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id)); // Remove item from cart
  };

  const handleCheckout = () => {
    router.push('/cart/checkout'); // Redirect to checkout page
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartQuantity({ id, quantity })); // Update quantity of the item
  };

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Calculate the current items based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  if (status === 'loading') {
    return <p className="text-center">Loading cart data...</p>;
  }
  if (status === 'failed') {
    return <p className="text-center text-red-600">Error fetching cart data: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
              {currentItems.map((item, index) => (
                <div key={index} className="flex border border-gray-300 rounded-lg p-4 my-4 shadow-md">
                  <img src={item.product.image} alt={item.product.title} className="w-24 h-24 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <h2 className="text-xl font-semibold">{item.product.title}</h2>
                    <p className="text-gray-600">Price: ${item.product.price.toFixed(2)}</p>
                    <div className="flex lg:flex-row flex-col my-1 lg:items-center items-start">
                      <div><span className="text-nowrap">Quantity: {item.quantity}</span></div>
                      <div className='bg-secondary flex flex-nowrap lg:mx-2 mx-0 mt-1 px-2 rounded-2xl '>
                      <button 
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="px-2 text-xl text-gray-600  hover:bg-gray-300"
                        disabled={item.quantity <= 1} // Disable button if quantity is 1
                      >
                        -
                      </button>
                      
                      <button 
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="px-2 text-xl  text-gray-600  hover:bg-gray-300"
                      >
                        +
                      </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.product.id)} 
                    className="text-red-600 hover:text-red-800 font-semibold ml-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex lg:justify-between lg:flex-row flex-col justify-center border-t border-gray-300 mt-4 pt-4">
              <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
              <button 
                onClick={handleCheckout}
                className="bg-blue-600 my-4 lg:my-0 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
            <Pagination
              totalItems={items.length} 
              itemsPerPage={itemsPerPage} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
