import user, { UserState } from "./userSlice";
import category, { CategoryState } from "./categorySlice";
import product, { ProductState } from "./productSlice";

export const mainReducer = {
  user: user.reducer,
  category: category.reducer,
  product: product.reducer,
};

interface StateType {
  user: UserState;
  category: CategoryState;
  product: ProductState;
}

export const selectUser = (state: StateType) => {
  return state.user;
};

export const selectCategory = (state: StateType) => {
  return state.category;
};

export const selectProduct = (state: StateType) => {
  return state.product;
};
