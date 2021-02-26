import category, { CategoryState } from "./categorySlice";
export const mainReducer = {
  category: category.reducer,
};

interface StateType {
  category: CategoryState;
}
export const selectCategory = (state: StateType) => {
  return state.category;
};
