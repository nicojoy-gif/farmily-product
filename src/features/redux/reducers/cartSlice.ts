import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const cartData = await response.json();

      const products = await Promise.all(
        cartData.flatMap((cart: any) =>
          cart.products.map((product: any) =>
            fetch(
              `https://fakestoreapi.com/products/${product.productId}`
            ).then((res) => res.json())
          )
        )
      );

      const cartItems = cartData.flatMap((cart: any) =>
        cart.products.map((product: any) => ({
          product: products.find((p) => p.id === product.productId) || {
            id: product.productId,
            title: "Unknown Product",
            price: 0,
            category: "",
            description: "",
            image: "",
          },
          quantity: product.quantity,
        }))
      );

      return cartItems;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (
    { id, quantity }: { id: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/7`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 3,
          date: "2019-12-10",
          products: [{ productId: id, quantity }],
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart quantity");
      }
      return { id, quantity };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.product.id === id);
        if (existingItem) {
          existingItem.quantity = quantity;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartSelector = (state: { cart: CartState }) => state.cart;
export const cartReducer = cartSlice.reducer;
