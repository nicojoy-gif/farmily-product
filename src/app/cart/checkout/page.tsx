// pages/checkout.tsx
'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { cartSelector } from '@/features/redux/reducers/cartSlice';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/features/header';
import Modal from '@/features/cart/modal';

const CheckoutPage = () => {
  const router = useRouter();
  const { items } = useSelector(cartSelector);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the order here (e.g., API call)
    setIsModalOpen(true); // Open the modal on successful order placement
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
    router.push('/'); // Redirect to homepage
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-center">Your cart is empty. Please add items to your cart before checking out.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="border border-gray-300 rounded-lg w-full p-2"
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address:</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="border border-gray-300 rounded-lg w-full p-2"
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Payment Method:</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="border border-gray-300 rounded-lg w-full p-2"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <h2 className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h2>
            <button 
              type="submit" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Place Order
            </button>
          </form>
        )}
      </div>

      {/* Modal for Order Confirmation */}
      <Modal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Thank You for Shopping!" 
        message="Your package will be delivered in 5 days." 
        onContinueShopping={handleContinueShopping} 
      />
    </div>
  );
};

export default CheckoutPage;
