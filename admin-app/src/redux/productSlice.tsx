import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import { ProductBaseDocumentType } from "../../../server/src/model/product";

//typeDef

export interface ProductState {
  products: { success: boolean; productList: ProductBaseDocumentType[] };
  loading: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: any;
  };
}

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

export const getAllProducts = createAsyncThunk("product/getProduct", async () => {
  try {
    const response = await axios.post("product/getProduct", undefined, { withCredentials: true });
    return response;
  } catch (err) {
    return err.response;
  }
});
//structure
const product = createSlice({
  name: "product",

  initialState: { products: {}, loading: "ready", error: { success: false, errorInfo: undefined } } as ProductState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      if (payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else {
        state.error = { success: true, errorInfo: undefined };
        state.products = payload.data;
      }
    });
  },
});

export default product;

//export actions
export const {} = product.actions;
