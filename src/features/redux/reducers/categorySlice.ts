import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithTimeout from './customFetch';

// Define the CategoryState interface
interface CategoryState {
  categories: Array<{ name: string; image: string }>; 
  products: Record<string, Array<any>>; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the categories
const initialState: CategoryState = {
  categories: [],
  products: {},
  status: 'idle',
  error: null,
};

// Manual mapping of categories to their corresponding images
const categoryImages: Record<string, string> = {
  electronics: '/assets/electronic.jpg',
  jewelery: '/assets/jewellry.jpg',
  "men's clothing": '/assets/mens cloth.jpg',
  "women's clothing": '/assets/images.jpeg',
};

// Create an async thunk to fetch categories from the Fake Store API
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    try {
      const response = await fetchWithTimeout('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map((category: string) => ({
        name: category,
        image: categoryImages[category] || '/assets/default.svg',
      }));
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);


export const fetchProductsByCategory = createAsyncThunk<
  { category: string; products: any[] },
  string
>(
  'category/fetchProductsByCategory',
  async (category: string) => {
    try {
      const response = await fetchWithTimeout(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return { category, products: data };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
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
        state.products[category] = products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong while fetching products';
      });
  },
});


export const categorySelector = (state: { category: CategoryState }) => state.category;
export const categoryReducer = categorySlice.reducer;
