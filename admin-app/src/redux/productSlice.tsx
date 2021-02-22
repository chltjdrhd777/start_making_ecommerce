import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

//typeDef

export interface ProductState {}

//async actions

//structure
const product = createSlice({
  name: "product",

  initialState: { userInfo: undefined, loading: "ready", error: { success: false, errorInfo: undefined } } as ProductState,

  reducers: {},
});

export default product;

//export actions
export const {} = product.actions;
