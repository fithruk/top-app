import { ReviewProps } from "./Review.props";
import user from "../../../public/user.png";
import styles from "./Review.module.css";
import cn from "classnames";
import Image from "next/image";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Rating from "../Rating/Rating";
const ReviewForm = ({ review, className, ...props }: ReviewProps) => {
  const { name, title, description, createdAt, rating } = review;
  return (
    <>
      <div className={cn(styles.review, className)} {...props}>
        <Image src={user.src} alt="UserIcon" width={30} height={30} />
        <div>
          <span className={styles.name}>{name} :</span>
          <span>{title} </span>
        </div>
        <div className={styles.date}>
          {format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
        </div>
        <div className={styles.rating}>
          <Rating rating={rating} />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <hr className={styles.hr} />
    </>
  );
};

export default ReviewForm;
