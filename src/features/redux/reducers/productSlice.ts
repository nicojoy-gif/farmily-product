import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk to fetch a product by its ID
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id: number) => {  // Specify the ID type
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;  // Return the product data
  }
);

// Define the initial state for the product slice
const initialState = {
  product: {},  // To store the fetched product details
  status: 'idle',  // Status of the async requests
  error: null,  // To store any error message
};

// Define the product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},  // No reducers needed here since we're only using async actions
  extraReducers: (builder) => {
    builder
      // Handle the pending state for fetching product
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';  // Update status to loading
      })
      // Handle the fulfilled state for fetching product
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Update status to succeeded
        state.product = action.payload;  // Set the product details
      })
      // Handle the rejected state for fetching product
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';  // Update status to failed
        state.error = action.error.message || 'Something went wrong';  // Set error message
      });
  },
});

// Selector to access the product state
export const productSelector = (state: { product: { product: any; status: string; error: string | null } }) => state.product;

// Export the reducer to be used in the store
export const productReducer = productSlice.reducer;
