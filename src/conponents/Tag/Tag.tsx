import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";
import cn from "classnames";

const Tag = ({
  size,
  children,
  color = "ghost",
  href,
  className,
  ...props
}: TagProps) => {
  return (
    <div
      className={cn(className, styles.tag, {
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.ghost]: color === "ghost",
        [styles.green]: color === "green",
        [styles.grey]: color === "grey",
        [styles.primary]: color === "primary",
        [styles.red]: color === "red",
        [styles.ghost]: color === "ghost",
      })}
    >
      {href ? <a href="href">{children}</a> : <>{children}</>}
    </div>
  );
};

export default Tag;
