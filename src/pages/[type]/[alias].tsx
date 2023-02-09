import axios from "axios";

import Head from "next/head";

import { MenuItem } from "inteafaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "inteafaces/page.interface";
import { ProductModel } from "inteafaces/product.interface";
import { ParsedUrlQuery } from "node:querystring";

import wistLayout from "@/layout/Layout";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { FirstLevelMenu } from "helpers/helpers";
import TopPageComponent from "@/conponents/PageComponents/TopPageComponent/TopPageComponent";

export function TopPage({
  menu,
  firstCategory,
  page,
  products,
}: TopPageProps): JSX.Element {
  return (
    <>
      {
        <TopPageComponent
          firstCategory={firstCategory}
          page={page}
          products={products}
        />
      }
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (let firstMenu of FirstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: firstMenu.id }
    );
    paths = paths.concat(
      menu.flatMap((m) => m.pages.map((p) => `/${firstMenu.route}/${p.alias}`))
    );
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = FirstLevelMenu.find(
    (firstMenu) => firstMenu.route == params.type
  );

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: firstCategoryItem.id }
    );

    if (!menu || menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`
    );
    const { data: products } = await axios.post<ProductModel[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
      {
        category: page.category,
        limit: 10,
      }
    );
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory?: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

export default wistLayout(TopPage);
