import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userInfo?: any;
}

const user = createSlice({
  name: "user",

  initialState: { userInfo: undefined } as UserState,

  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = undefined;
    },
  },
});

export default user;

export const { login, logout } = user.actions;
