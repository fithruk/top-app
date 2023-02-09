import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import cn from "classnames";
import Hteg from "@/conponents/Hteg/Hteg";
import Tag from "@/conponents/Tag/Tag";
import HhData from "@/conponents/HhData/HhData";
import { TopLevelCategory } from "inteafaces/page.interface";
import { Advantages } from "@/conponents/Advantages/Advantages";
import Sort from "@/conponents/Sort/Sort";
import { SortEnam } from "@/conponents/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";
import { useEffect, useReducer } from "react";
import Product from "@/conponents/Product/Product";

const TopPageComponent = ({
  firstCategory,
  page,
  products,
}: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnam.Rating,
    }
  );

  const setSort = (sort: SortEnam) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Hteg tag="h1">{page.title}</Hteg>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div className="">
        {sortedProducts &&
          sortedProducts.map((product) => (
            <Product layout product={product} key={product._id} />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Hteg tag="h2">Вакансии - {page.category}</Hteg>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Cources && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <Advantages advantages={page.advantages} />
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        ></div>
      )}
      <Hteg tag="h2">Получаемые навыки:</Hteg>
      {page.tags.map((teg) => (
        <Tag key={teg} color="primary">
          {teg}
        </Tag>
      ))}
    </div>
  );
};

export default TopPageComponent;
