import category, { CategoryState } from "./categorySlice";
import product, { ProductState } from "./productslice";
export const mainReducer = {
  category: category.reducer,
  product: product.reducer,
};

interface StateType {
  category: CategoryState;
  product: ProductState;
}
export const selectCategory = (state: StateType) => {
  return state.category;
};

export const selectProduct = (state: StateType) => {
  return state.product;
};
