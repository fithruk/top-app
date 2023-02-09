import { TopLevelCategory } from "inteafaces/page.interface";
import { FirstLevelMenuItem } from "inteafaces/menu.interface";

const FirstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "cources",
    name: "Курсы",
    id: TopLevelCategory.Cources,
  },
  {
    route: "books",
    name: "Книги",
    id: TopLevelCategory.Books,
  },
  {
    route: "products",
    name: "Товары",
    id: TopLevelCategory.Products,
  },
  {
    route: "services",
    name: "Сервисы",
    id: TopLevelCategory.Services,
  },
];

const decOfNum = (number: number, titles: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export { FirstLevelMenu, decOfNum };
