import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

const Button = ({
  children,
  appearence,
  arrow = "none",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearence == "primary",
        [styles.ghost]: appearence == "ghost",
      })}
      {...props}
    >
      {children}
      {arrow === "right" ? (
        <i className={cn("fa-solid fa-caret-right", styles.arrow)}></i>
      ) : arrow === "down" ? (
        <i className={cn("fa-sharp fa-solid fa-caret-down", styles.arrow)}></i>
      ) : null}
    </button>
  );
};

export default Button;
