import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

//typeDef

export interface ProductState {}

//async actions
export const setProducts = createAsyncThunk("product/createProduct", async (payload: any) => {
  try {
    const response = await axios.post("/product/createProduct", payload, { withCredentials: true });
    console.log(response);
    /* return response; */
  } catch (err) {
    console.log(err.response);
  }
});
//structure
const product = createSlice({
  name: "product",

  initialState: { userInfo: undefined, loading: "ready", error: { success: false, errorInfo: undefined } } as ProductState,

  reducers: {},
});

export default product;

//export actions
export const {} = product.actions;
