import styles from "./ButtonIcon.module.css";
import { ButtonIconProps } from "./ButtonIcon.props";
import cn from "classnames";

const ButtonIcon = ({
  children,
  appearence,
  className,
  icon,
  ...props
}: ButtonIconProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearence == "primary",
        [styles.ghost]: appearence == "ghost",
        [styles.close]: icon == "close",
        [styles.burger]: icon == "burger",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
