import category, { CategoryState } from "./categorySlice";
import product, { ProductState } from "./productslice";
import { RootState } from "./store";
export const mainReducer = {
  category: category.reducer,
  product: product.reducer,
};
/* 
interface StateType {
  category: CategoryState;
  product: ProductState;
} */

export const selectCategory = (state: RootState) => {
  return state.category;
};

export const selectProduct = (state: RootState) => {
  return state.product;
};
