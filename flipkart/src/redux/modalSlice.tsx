import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import { UserBaseDocumentType } from "../../../server/src/model/UserModel";

//typeDef

export interface ModalState {
  clicked: boolean;
  error: {
    success: boolean;
    errorInfo: any;
  };
  userData: UserBaseDocumentType;
  loading: "ready" | "pending" | "finished" | "failed";
}

//async actions
export const loginFunc = createAsyncThunk("user/login", async (payload: { email: string; password: string }) => {
  try {
    const response = await axios.post("/auth/login", payload);
    return response;
  } catch (err) {
    return err.response;
  }
});

//structure
const modal = createSlice({
  name: "category",

  initialState: { clicked: false, error: { success: false, errorInfo: undefined }, userData: {}, loading: "ready" } as ModalState,

  reducers: {
    loading: (state, { payload }) => {
      state.loading = payload;
    },
    onClicked: (state) => {
      state.clicked = !state.clicked;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginFunc.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else if (payload && payload.status === 200) {
        state.error = { success: true, errorInfo: undefined };
        state.userData = payload.data.targetUser;
      }
    });
  },
});

export default modal;

//export actions
export const { onClicked } = modal.actions;
