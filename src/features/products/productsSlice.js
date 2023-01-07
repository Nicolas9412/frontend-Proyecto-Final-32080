import { createSlice } from "@reduxjs/toolkit";
import Product from "../../models/Product";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      return {
        ...state,
        products: action.payload.products?.map(
          (item) =>
            new Product(
              item._id,
              item.title,
              item.description,
              item.price,
              item.thumbnail,
              item.stock,
              item.category
            )
        ),
      };
    },
  },
});

export const { loadProducts } = productsSlice.actions;

export const getProducts = () => {
  return async (dispatch) => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/productos`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data?.error) {
            throw result.data?.error;
          }
          const products = result.data;
          dispatch(loadProducts({ products }));
        });
    } catch (error) {
      throw error;
    }
  };
};

export default productsSlice.reducer;
