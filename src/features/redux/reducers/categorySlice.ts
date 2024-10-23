import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the CategoryState interface
interface CategoryState {
  categories: Array<{ name: string; image: string }>; // Each category includes name and image
  products: Record<string, Array<any>>; // Storing products by category
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the categories
const initialState: CategoryState = {
  categories: [],
  products: {}, // Initialize as an empty object
  status: 'idle',
  error: null,
};

// Manual mapping of categories to their corresponding images
const categoryImages: Record<string, string> = {
  electronics: '/assets/electronics.jpg',
  jewelery: '/assets/jewellry.jpg',
  "men's clothing": '/assets/mens cloth.jpg',
  "women's clothing": '/assets/images.jpeg',
};

// Create an async thunk to fetch categories from the Fake Store API
export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  
  // Map each category to an object that includes its name and corresponding image
  return response.data.map((category: string) => ({
    name: category,
    image: categoryImages[category] || '/assets/default.svg', // Use a default image if the category doesn't have one
  }));
});

// Create an async thunk to fetch products for a specific category
export const fetchProductsByCategory = createAsyncThunk(
  'category/fetchProductsByCategory',
  async (category: string) => {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return { category, products: response.data }; // Return the category and the fetched products
  }
);

// Define the category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {}, // No reducers needed here since we're only using async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload; // Set the categories with name and image
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { category, products } = action.payload;
        state.products[category] = products; // Store products under the respective category
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong while fetching products';
      });
  },
});

// Selector to access the categories and products state
export const categorySelector = (state: { category: CategoryState }) => state.category;

// Export the reducer
export const categoryReducer = categorySlice.reducer;
