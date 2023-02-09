import { TopLevelCategory, TopPageModel } from "inteafaces/page.interface";
import { ProductModel } from "inteafaces/product.interface";

export interface TopPageComponentProps {
  firstCategory?: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
