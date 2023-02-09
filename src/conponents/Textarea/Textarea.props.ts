import {
  DetailedHTMLProps,
  HTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}
