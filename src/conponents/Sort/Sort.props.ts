import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnam;
  setSort: (sort: SortEnam) => void;
}

export enum SortEnam {
  Rating,
  Price,
}
