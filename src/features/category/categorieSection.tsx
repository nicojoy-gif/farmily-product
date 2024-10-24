'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCategories, categorySelector } from '../redux/reducers/categorySlice';
import { FaIcons } from 'react-icons/fa';
import { CategorySection } from './categories';

interface CategoryPageProps {
  searchTerm: string;
}

export default function CategoryPage({ searchTerm }: CategoryPageProps) {
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector(categorySelector);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((category: { name: string }) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 mt-4 mx-4">
      <div className="flex max-w-3xl items-center pt-4 w-full mx-auto justify-between">
        <h1 className="font-bold text-lg">Categories</h1>
        <div><FaIcons /></div>
      </div>

      {status === 'loading' && <p>Loading categories...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <CategorySection items={filteredCategories} />
      )}
    </div>
  );
}
