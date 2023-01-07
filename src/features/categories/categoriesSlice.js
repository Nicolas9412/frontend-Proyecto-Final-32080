import { createSlice } from "@reduxjs/toolkit";
import Category from "../../models/Category";

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loadCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload.categories?.map(
          (item) => new Category(item._id, item.name)
        ),
      };
    },
  },
});

export const { loadCategories } = categoriesSlice.actions;

export const getCategories = () => {
  return async (dispatch) => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categorias`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data?.error) {
            throw result.data?.error;
          }
          const categories = result.data;
          dispatch(loadCategories({ categories }));
        });
    } catch (error) {
      throw error;
    }
  };
};

export default categoriesSlice.reducer;
