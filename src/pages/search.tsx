import wistLayout from "@/layout/Layout";
import axios from "axios";
import { MenuItem } from "inteafaces/menu.interface";
import { GetStaticProps } from "next";

export function Seach(): JSX.Element {
  return (
    <>
      <main>Search</main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  );

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory?: number;
}

export default wistLayout(Seach);
