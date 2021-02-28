import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import { ProductBaseDocumentType } from "../../../server/src/model/product";
//typeDef

export interface ProductsType {
  docs: ProductBaseDocumentType[];
  productByPrice:
    | {
        under10: ProductBaseDocumentType[];
        is10to15: ProductBaseDocumentType[];
        is15to20: ProductBaseDocumentType[];
        over20: ProductBaseDocumentType[];
      }
    | any;
}

export interface ProductsType2 {
  docs: ProductBaseDocumentType[];
  productByPrice: {
    [key: string]: ProductBaseDocumentType[];
  };
}

export interface ProductState {
  products: ProductsType2;
  loading: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: any;
  };
}

//async actions
export const getProductBySlug = createAsyncThunk("product/getProductBySlug", async (slug: any) => {
  try {
    const response = await axios.get(`product/${slug}`);
    return response;
  } catch (err) {
    return err.response;
  }
});

//structure
const product = createSlice({
  name: "productBySlug",

  initialState: { products: {}, loading: "ready", error: { success: false, errorInfo: undefined } } as ProductState,

  reducers: {
    Loading: (state, { payload }) => {
      state.loading = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProductBySlug.fulfilled, (state, { payload }) => {
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
export const { Loading } = product.actions;
