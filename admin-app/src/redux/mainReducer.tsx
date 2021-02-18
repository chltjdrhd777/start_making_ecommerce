import user from "./userSlice";

export const mainReducer = {
  user: user.reducer,
};

export const selectUser = (state: typeof mainReducer) => {
  return state.user;
};
