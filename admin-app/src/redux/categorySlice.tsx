import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

//typeDef

export interface CategoryState {}

//async actions
export const getAllCategories = createAsyncThunk("category/getCategories", async () => {
  try {
    const response = await axios.get("/category/getCategory");
    console.log(response);
    /* return response; */
  } catch (err) {
    /*  return err.response; */
    console.log(err.response);
  }
});

//structure
const category = createSlice({
  name: "category",

  initialState: { userInfo: undefined, loading: "ready", error: { success: false, errorInfo: undefined } } as CategoryState,

  reducers: {
    getAllCategory: (state) => {},
  },
});

export default category;

//export actions
export const { getAllCategory } = category.actions;
