import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

type CategoryItem = {
  name: string;
  image: string;
};
type CategorySectionProps = {
  items: CategoryItem[];
};

export const CategorySection: React.FC<CategorySectionProps> = ({ items }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-4">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4 cursor-pointer"
            onClick={() => handleCategoryClick(item.name)}
          >
            <div className="flex justify-between lg:w-24 lg:h-24 w-16 h-16 items-center border shadow-[#00000040] rounded-full border-lightgray">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="ml-10 text-lg font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
