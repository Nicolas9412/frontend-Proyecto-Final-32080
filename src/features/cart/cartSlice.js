import { createSlice } from "@reduxjs/toolkit";
import Product from "../../models/Product";

const initialState = {
  email: null,
  datetime: null,
  products: [],
  address: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      return {
        ...state,
        email: action.payload.cart.email,
        datetime: action.payload.cart.datetime,
        products: [...action.payload.cart.products],
        address: action.payload.cart.address,
      };
    },
    modifyQuantity: (state, action) => {
      return {
        ...state,
        email: action.payload.cart.email,
        datetime: action.payload.cart.datetime,
        products: [...action.payload.cart.products],
        address: action.payload.cart.address,
      };
    },
    loadCart: (state, action) => {
      return {
        ...state,
        email: action.payload.cart.email,
        datetime: action.payload.cart.datetime,
        products: [...action.payload.cart.products],
        address: action.payload.cart.address,
      };
    },
    createCart: (state, action) => {
      return {
        ...state,
        products: [action.payload.product],
        email: action.payload.email,
        datetime: action.payload.datetime,
        address: action.payload.address,
      };
    },
    addCart: (state, action) => {
      const productToCart = new Product(
        action.payload.product._id,
        action.payload.product.title,
        action.payload.product.description,
        action.payload.product.price,
        action.payload.product.thumbnail,
        action.payload.product.stock,
        action.payload.product.category,
        action.payload.product.quantity
      );
      state.products.push(productToCart);
    },
  },
});

export const { addCart, createCart, loadCart, modifyQuantity, deleteProduct } =
  cartSlice.actions;

export const removeProduct = ({ idProduct, email }) => {
  return async (dispatch) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/carrito/${idProduct}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      }
    );
    const result = await response.json();
    if (result.data.error) {
      return;
    }
    const cart = result.data;
    if (cart) {
      dispatch(deleteProduct({ cart }));
    }
  };
};

export const updatedQuantity = ({ idProduct, email, quantity }) => {
  return async (dispatch) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/carrito/${idProduct}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          quantity,
        }),
      }
    );
    const result = await response.json();
    if (result.data?.error) {
      throw result.data?.error;
    }
    const cart = result.data;
    if (cart) {
      dispatch(modifyQuantity({ cart }));
    }
  };
};

export const getCart = ({ email }) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/carrito/${email}`,
        {
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.data?.error) {
        throw result.data?.error;
      }
      const cart = result.data;
      if (cart) {
        dispatch(loadCart({ cart }));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const saveCart = ({ idProduct, quantity, email, address }) => {
  const bodyString = JSON.stringify({
    idProduct,
    quantity,
    email,
    address,
    datetime: Date.now(),
  });
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/carrito`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: bodyString,
        }
      );
      const result = await response.json();
      if (result.data?.error) {
        throw result.data?.error;
      }
      const { productAdd, cart } = result.data;
      const { address, email, datetime } = cart;
      dispatch(
        createCart({ product: { ...productAdd }, address, email, datetime })
      );
    } catch (error) {
      throw error;
    }
  };
};

export const saveProduct = ({ idProduct, quantity, email }) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/carrito`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            idProduct,
            quantity,
          }),
        }
      );
      const result = await response.json();
      const { productAdd } = result.data;
      dispatch(createCart({ product: { ...productAdd } }));
    } catch (error) {
      throw error;
    }
  };
};

export default cartSlice.reducer;
