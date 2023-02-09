import wistLayout from "@/layout/Layout";
import axios from "axios";
import { FirstLevelMenu } from "helpers/helpers";
import { MenuItem } from "inteafaces/menu.interface";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export function Type({ firstCategory }: TypeProps): JSX.Element {
  return (
    <>
      <main>Type :{firstCategory}</main>
    </>
  );
}

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory?: number;
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
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

  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory: firstCategoryItem.id }
  );
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: FirstLevelMenu.map((firstMenu) => "/" + firstMenu.route),
    fallback: true,
  };
};

export default wistLayout(Type);
