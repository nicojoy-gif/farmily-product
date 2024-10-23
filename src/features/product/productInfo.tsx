import React from "react";

interface ProductInfoProps {
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  category,
  description,
  price,
  image,
}) => {
  return (
    <div>
      <div className="product-background rounded-xl lg:w-1/2 lg:h-1/2 w-full h-full p-6 flex-col flex">
        <div className="product flex justify-center items-center">
          <div>
            <img src={image} className="h-48 w-48" alt={title} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start py-2">
        <h2 className="capitalize text-dark font-bold text-lg">{category}</h2>
        <p className="text-surface-600 font-medium">{title}</p>
      </div>
      <h2 className="capitalize text-dark font-bold text-xl">{title}</h2>
      <p className="py-2 text-primary">{description}</p>
      <p className="text-dark-400 font-medium">
        Starting Price: ${price} (5pcs)
      </p>
    </div>
  );
};

export default ProductInfo;
