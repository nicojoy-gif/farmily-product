// src/components/CategoryCard.tsx
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Importing heart icons
import { FaPlus } from 'react-icons/fa';

interface CategoryCardProps {
  id: string; // ID is a string
  title: string;
  image: string;
  price: number;
  onClick: (id: string) => void; // Click handler with string ID
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, title, image, price, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false); // State to manage favorite status

  // Function to handle favorite toggle
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Toggle the favorite state
  };

  return (
    <div
      key={id}
      className="border  border-[rgba(128, 128, 128, 0.3)] p-4 rounded-2xl cursor-pointer shadow-custom-light relative" // Adding relative positioning
      onClick={() => onClick(id)} // Trigger the click event passed as prop
    >
      <div className='flex my-3 justify-center items-center'>
      <img src={image} alt={title} className="w-32 h-24 object-cover mb-2" />
      </div>
      <h2 className="font-bold text-sm  text-dark">{title}</h2>
      <div className="flex justify-between items-center">
        <p className="text-xs text-surface py-2">${price.toFixed(2)}</p> {/* Format price to 2 decimal places */}
        
        {/* Cart Button */}
        <button
        className="flex items-center text-sm text-white bg-primary p-2   rounded-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            // Add functionality to handle adding to cart
            console.log(`Added ${title} to cart`); // Placeholder action
          }}
        >
          <FaPlus color='white' /> {/* Shopping cart icon */}
         
        </button>
      </div>
      {/* Favorite icon */}
      <div
        className="absolute top-2  right-2 cursor-pointer" // Position the icon in the top right corner
        onClick={(e) => {
          e.stopPropagation(); // Prevent the card click event when clicking the icon
          toggleFavorite(); // Call the toggle function
        }}
      >
        {isFavorited ? (
          <div className='bg-white  border border-[rgba(128, 128, 128, 0.3)] p-1 rounded-full'>
          <AiOutlineHeart className="text-red-500" size={16} /> 
          </div>// Filled heart when favorited
        ) : (
          <div className='bg-white  border border-[rgba(128, 128, 128, 0.3)] p-1 rounded-full'>
          <AiOutlineHeart color='#808080' size={16} /> 
          </div>
        )}
      </div>
    </div>
  );
};
