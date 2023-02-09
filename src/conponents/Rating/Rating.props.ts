import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rating: number;
  setRating?: (rating: number) => void;
  isEditable?: boolean;
}
