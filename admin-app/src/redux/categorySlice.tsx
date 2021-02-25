import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

//typeDef

export interface CategoryState {
  categories: { categoryList: []; docs: []; success: boolean };
  loading: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: any;
  };
}

//async actions
export const getAllCategories = createAsyncThunk("category/getCategories", async () => {
  try {
    const response = await axios.post("/category/getCategory", undefined, { withCredentials: true });
    return response;
  } catch (err) {
    return err.response;
  }
});

export const createCategories = createAsyncThunk("category/createCategory", async (payload: any) => {
  try {
    const response = await axios.post("/category/createCategory", payload, { withCredentials: true });
    console.log(response);
  } catch (err) {
    return err.response;
  }
});

//structure
const category = createSlice({
  name: "category",

  initialState: { categories: {}, loading: "ready", error: { success: false, errorInfo: undefined } } as CategoryState,

  reducers: {
    categoryLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },

  extraReducers: (builder) => {
    //login
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      if (payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else {
        state.error = { success: true, errorInfo: undefined };
        state.categories = payload.data;
      }
    });
  },
});

export default category;

//export actions
export const { categoryLoading } = category.actions;
