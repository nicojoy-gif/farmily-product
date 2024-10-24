import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  onClick: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  image,
  price,
  onClick,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      key={id}
      className="border min-w-80 border-[rgba(128, 128, 128, 0.3)] p-4 rounded-2xl cursor-pointer shadow-custom-light relative" // Adding relative positioning
      onClick={() => onClick(id)}
    >
      <div className="flex my-3 justify-center items-center">
        <img src={image} alt={title} className="w-32 h-24 object-cover mb-2" />
      </div>
      <h2 className="font-bold text-sm  text-dark">{title}</h2>
      <div className="flex justify-between items-center">
        <p className="text-xs text-surface py-2">${price.toFixed(2)}</p>

        <button
          className="flex items-center text-sm text-white bg-primary p-2   rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Added ${title} to cart`);
          }}
        >
          <FaPlus color="white" />
        </button>
      </div>

      <div
        className="absolute top-2  right-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorited ? (
          <div className="bg-white  border border-[rgba(128, 128, 128, 0.3)] p-1 rounded-full">
            <AiOutlineHeart className="text-red-500" size={16} />
          </div>
        ) : (
          <div className="bg-white  border border-[rgba(128, 128, 128, 0.3)] p-1 rounded-full">
            <AiOutlineHeart color="#808080" size={16} />
          </div>
        )}
      </div>
    </div>
  );
};
