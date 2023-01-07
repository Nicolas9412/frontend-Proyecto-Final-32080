import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import ordersReducer from "../features/orders/ordersSlice";
import chatReducer from "../features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
    cart: cartReducer,
    category: categoriesReducer,
    order: ordersReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
