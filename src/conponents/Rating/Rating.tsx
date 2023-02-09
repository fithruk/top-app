import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import { useEffect, useState } from "react";

const Rating = ({ isEditable, setRating, rating, ...props }: RatingProps) => {
  const [ratingArr, setRatingArr] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  const constructRating = (currentRating: number) => {
    const updatedArr = ratingArr.map((r: JSX.Element, i: number) => {
      return (
        <div
          key={i}
          className={cn(styles.star, {
            [styles.fill]: currentRating > i,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => {
            onHandleChange(i);
          }}
          onMouseLeave={() => {
            onHandleChange(rating - 1);
          }}
          onClick={() => {
            onSetRating(i);
          }}
        ></div>
      );
    });
    setRatingArr(updatedArr);
  };

  const onHandleChange = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i + 1);
  };

  const onSetRating = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }

    setRating(i + 1);
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div {...props} className={styles.starWrapper}>
      {ratingArr}
    </div>
  );
};

export default Rating;
