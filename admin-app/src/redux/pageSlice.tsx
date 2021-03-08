import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PageBaseDocumentType } from "../../../server/src/model/page";

//typeDef

export interface PageState {
  page: { success: boolean; productList: PageBaseDocumentType[] };
  loadingState: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: any;
  };
}

//async actions

//structure
const product = createSlice({
  name: "page",

  initialState: { page: {}, loadingState: "ready", error: { success: false, errorInfo: undefined } } as PageState,

  reducers: {
    loading: (state, { payload }) => {
      state.loadingState = payload;
    },

    createPage: (state, { payload }) => {
      if (payload.status === 201) {
        state.error = { success: true, errorInfo: undefined };
        state.page = payload.data.doc;
      } else {
        state.error = { success: false, errorInfo: payload.data.err };
      }
    },
  },
});

export default product;

//export actions
export const { loading, createPage } = product.actions;
