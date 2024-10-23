'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../features/hooks/hooks';
import { fetchProductsByCategory, categorySelector } from '../../../features/redux/reducers/categorySlice';
import { use } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { CategoryCard } from '@/features/category';
import { Navbar } from '@/features/header';
import { FaAngleLeft } from 'react-icons/fa';

interface CategoryProductsPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter(); // Initialize router
  const { products, status, error } = useAppSelector(categorySelector);

  // Unwrap the params using React.use()
  const { category } = use(params);

  // Fetch products for the selected category on component mount
  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  // State for filters
  const [sortOrder, setSortOrder] = useState('default'); // Default sorting
  const [showFavorites, setShowFavorites] = useState(false); // Filter for favorites
  const [maxPrice, setMaxPrice] = useState(10000); // Default max price

  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'failed') {
    console.error('Error fetching products:', error);
    return <p>Error: {error}</p>;
  }

  const categoryProducts = products[category] || [];

  // Filter and sort products based on the filters
  let filteredProducts = [...categoryProducts];

  // Filter for favorites if enabled
  if (showFavorites) {
    filteredProducts = filteredProducts.filter(product => product.isFavorited); // Assuming `isFavorited` is a property
  }

  // Filter by price
  filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);

  // Sort products based on selected order
  if (sortOrder === 'low-to-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Handle click event to navigate to product details page
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`); // Navigate to the product details page
  };

  return (
    <div>
      <Navbar />
      
      {/* Filter Section */}
      <div className="flex justify-between items-center my-4 px-4 max-w-6xl mx-auto">
        <div>
          <label className="mr-2">Sort By:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded p-1"
          >
            <option value="default">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
        
        <div>
          <label className="mr-2">Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border border-gray-300 rounded p-1 w-24"
          />
        </div>

        <div className='hidden md:flex'>
          <label className="mr-2">Show Favorites:</label>
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={() => setShowFavorites(!showFavorites)}
          />
        </div>
      </div>

      <div className="space-y-10  my-4 max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <div className='flex items-center gap-4'>
        <button onClick={() => router.back()} className="flex items-center mb-4">
          <FaAngleLeft /> 
        </button>
        
        <h1 className="font-bold text-2xl flex items-center capitalize text-darkgray gap-4 mb-4">
          {category}
        </h1>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CategoryCard
                key={product.id} // Unique key for each product
                id={product.id} // Pass product ID
                title={product.title} // Pass product title
                image={product.image} // Pass product image
                price={product.price} // Pass product price
                onClick={handleProductClick} // Pass click handler
              />
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
