'use client'
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCategories, categorySelector } from '../redux/reducers/categorySlice';
import { FaIcons } from 'react-icons/fa';
import { CategorySection } from './categories';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector(categorySelector);

  useEffect(() => {
    console.log('Dispatching fetchCategories...');
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'loading') console.log('Categories are loading...');
    if (status === 'succeeded') console.log('Categories fetched successfully:', categories);
    if (status === 'failed') console.error('Failed to fetch categories:', error);
  }, [status, categories, error]);

  return (
    <div className="space-y-10 mt-4 mx-4">
      <div className="flex max-w-3xl items-center pt-4 w-full mx-auto justify-between">
        <h1 className="font-bold text-lg">Categories</h1>
        <div><FaIcons /></div>
      </div>

      {/* Display fetched categories */}
      {status === 'loading' && <p>Loading categories...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <CategorySection items={categories} />
      )}
    </div>
  );
}
