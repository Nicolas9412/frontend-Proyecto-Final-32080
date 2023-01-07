import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../../models/Message";

const initialState = {
  messages: [],
  lastMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    loadMessages: (state, action) => {
      return {
        ...state,
        messages: action.payload.chat?.map(
          (item) =>
            new Message(
              item._id,
              item.email,
              item.type,
              item.datetime,
              item.body,
              item.read
            )
        ),
      };
    },
    loadLastMessages: (state, action) => {
      return {
        ...state,
        lastMessages: action.payload.lastMessages?.map(
          (item) =>
            new Message(
              item._id,
              item.email,
              item.type,
              item.datetime,
              item.body,
              item.read
            )
        ),
      };
    },
  },
});

export const { loadMessages, loadLastMessages } = chatSlice.actions;

export const getMessages = ({ email }) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/chat/${email}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.data?.error) throw result.data?.error;
      const chat = result.data;
      dispatch(loadMessages({ chat }));
    } catch (error) {
      throw error;
    }
  };
};

export const getLastMessages = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/chat/messages/last`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.data?.error) throw result.data?.error;
      const lastMessages = result.data.messages;
      dispatch(loadLastMessages({ lastMessages }));
    } catch (error) {
      throw error;
    }
  };
};

export default chatSlice.reducer;
