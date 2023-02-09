import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";
import cn from "classnames";

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      placeholder="Текст отзыва"
      className={cn(styles.input, className)}
      {...props}
    />
  );
};

export default Textarea;
