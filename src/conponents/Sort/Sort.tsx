import { SortProps, SortEnam } from "./Sort.props";
import styles from "./Sort.module.css";
import cn from "classnames";

const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        className={cn({
          [styles.active]: sort == SortEnam.Rating,
        })}
        onClick={() => {
          setSort(SortEnam.Rating);
        }}
      >
        По рейтингу
      </span>
      <span
        className={cn({
          [styles.active]: sort == SortEnam.Price,
        })}
        onClick={() => {
          setSort(SortEnam.Price);
        }}
      >
        По цене
      </span>
    </div>
  );
};

export default Sort;
