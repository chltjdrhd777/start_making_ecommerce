import user, { UserState } from "./userSlice";

export const mainReducer = {
  user: user.reducer,
};

interface StateType {
  user: UserState;
}

export const selectUser = (state: StateType) => {
  return state.user;
};
