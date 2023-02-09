import { ReviewFormProps } from "./ReviewForm.props";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import Rating from "../Rating/Rating";
import Button from "../Button/Button";
import { useState } from "react";

export interface IReviewForm {
  name: string;
  title: string;
  description: string;
  rating: number;
}

export interface IReviewResponce {
  message: string;
}

const ReviewForm = ({ productId, className, ...props }: ReviewFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSucces, setIsSucces] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();
  const onSubmit = async (dataForm: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewResponce>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/review/create-demo",
        { ...dataForm, productId }
      );

      if (data.message) {
        setIsSucces(true);
        reset();
      } else {
        setIsError("Что-то пошло не так...");
      }
    } catch (e: any) {
      setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <div className={styles.inputWrapper}>
          <input
            {...register("name", {
              required: { value: true, message: "Заполните имя" },
            })}
            placeholder="Имя"
            className={cn(styles.input, {
              [styles.validationError]: errors.name?.message,
            })}
          />
          {errors.name?.message && (
            <span className={styles.error}>{errors.name?.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            {...register("title", {
              required: { value: true, message: "Заполните заголовок" },
            })}
            className={cn(styles.title, styles.input, {
              [styles.validationError]: errors.title?.message,
            })}
            placeholder="Тект заголовка"
          />
          {errors.title?.message && (
            <span className={styles.error}>{errors.title?.message}</span>
          )}
        </div>
        <div className={styles.rating}>
          <span
            className={cn({
              [styles.rateError]: errors.rating?.message,
            })}
          >
            {errors.rating?.message ? errors.rating?.message : "Оценка"}
          </span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Поставьте оценку" } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={Number(field.value)}
                setRating={field.onChange}
              />
            )}
          />
        </div>
        <div className={cn(styles.description, styles.inputWrapper)}>
          <textarea
            {...register("description", {
              required: { value: true, message: "Заполните комментарий" },
            })}
            className={cn(styles.description, styles.input, {
              [styles.validationError]: errors.description?.message,
            })}
            placeholder="Текст отзыва"
          />
          {errors.description?.message && (
            <span className={styles.error}>{errors.description?.message}</span>
          )}
        </div>
        <div className={styles.submit}>
          <Button
            type="submit"
            appearence="primary"
            className={cn({
              [styles.seccesedMsg]: isSucces,
              [styles.rejectedMsg]: isError,
            })}
          >
            {isSucces ? "Ваш отзыв успешно отправлен" : "Отправить"}
            {isError && isError}
          </Button>
          <span className={styles.warn}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
