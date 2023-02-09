import { SortEnam } from "@/conponents/Sort/Sort.props";
import { ProductModel } from "inteafaces/product.interface";

export type SortActions =
  | { type: SortEnam.Price }
  | { type: SortEnam.Rating }
  | { type: "reset"; initialState: ProductModel[] };

export interface SortReducerState {
  sort: SortEnam;
  products: ProductModel[];
}

export const sortReducer = (
  state: SortReducerState,
  action: SortActions
): SortReducerState => {
  switch (action.type) {
    case SortEnam.Rating:
      return {
        sort: SortEnam.Rating,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      };
    case SortEnam.Price:
      return {
        sort: SortEnam.Price,
        products: state.products.sort((a, b) => (a.price < b.price ? 1 : -1)),
      };
    case "reset":
      return {
        sort: SortEnam.Rating,
        products: action.initialState.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      };

    default:
      throw new Error("Неверный тип сортировки");
  }
};
