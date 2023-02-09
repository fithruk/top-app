import Image from "next/image";
import cn from "classnames";
import Card from "../Card/Card";
import { ProductProps } from "./Product.props";
import { decOfNum } from "helpers/helpers";
import styles from "./Product.module.css";
import Rating from "../Rating/Rating";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import Hteg from "../Hteg/Hteg";
import { useState, forwardRef, ForwardedRef } from "react";
import Review from "../Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";

// eslint-disable-next-line react/display-name
const Product = motion(
  // eslint-disable-next-line react/display-name
  forwardRef(
    (
      { product, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [isOpened, setIsOpened] = useState<boolean>(false);

      const onSetIsOpened = () => {
        setIsOpened((isOpened) => (isOpened = !isOpened));
      };

      const variants = {
        visible: {
          height: "auto",
          opacity: 1,
        },
        hidden: {
          height: 0,
          opacity: 0,
        },
      };

      return (
        <div ref={ref} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {product.price} P
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  -{product.oldPrice - product.price}P
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {product.credit} P<span className={styles.month}>/ месяц</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((tag) => (
                <Tag color="ghost" key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>Цена</div>
            <div className={styles.creditTitle}>Кредит</div>
            <div className={styles.rateTitle}>
              {product.reviewCount}{" "}
              {decOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
            </div>
            <div className={styles.hr}>
              <hr />
            </div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>
              {product.characteristics.map((characteristic) => (
                <div
                  className={styles.characteristics}
                  key={characteristic.name}
                >
                  <span className={styles.characteristicName}>
                    {characteristic.name}
                  </span>
                  <span className={styles.characteristicDots}></span>
                  <span className={styles.characteristicValue}>
                    {characteristic.value}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <Hteg tag="h4">Преимущества</Hteg>{" "}
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <Hteg tag="h4">Недостатки</Hteg>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <div className={cn(styles.hr, styles.hr2)}>
              <hr />
            </div>
            <div className={styles.actions}>
              <Button appearence="primary">Узнать подробнее</Button>
              <Button
                appearence="ghost"
                arrow={isOpened ? "down" : "right"}
                onClick={onSetIsOpened}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            initial={"hidden"}
            animate={isOpened ? "visible" : "hidden"}
          >
            <Card color="blue" className={styles.reviews}>
              {product.reviews.map((review) => (
                <Review key={review._id} review={review} />
              ))}
            </Card>
          </motion.div>
          <ReviewForm productId={product._id} />
        </div>
      );
    }
  )
);

export default Product;
