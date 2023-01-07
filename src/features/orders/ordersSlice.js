import { createSlice } from "@reduxjs/toolkit";
import Order from "../../models/Order";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      return {
        ...state,
        orders: action.payload.orders?.map(
          (item) =>
            new Order(
              item._id,
              item.products,
              item.numberOrder,
              item.datetime,
              item.state,
              item.email
            )
        ),
      };
    },
  },
});

export const { loadOrders } = ordersSlice.actions;

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/ordenes`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.data?.error) throw result.data?.error;
      const orders = result.data;
      dispatch(loadOrders({ orders }));
    } catch (error) {
      throw error;
    }
  };
};

export default ordersSlice.reducer;
