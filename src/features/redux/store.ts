import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from './reducers/categorySlice';
import { productReducer } from './reducers/productSlice';
import { cartReducer } from './reducers/cartSlice';


export const store = configureStore({
    reducer: {
        
       category: categoryReducer,
       product: productReducer,
       cart: cartReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
