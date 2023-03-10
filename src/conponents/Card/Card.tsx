import { CardProps } from "./Card.props";
import styles from "./Card.module.css";
import cn from "classnames";

const Card = ({
  color = "white",
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color == "blue",
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
