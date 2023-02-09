import { useContext } from "react";
import cn from "classnames";
import styles from "./Menu.module.css";
import { AppContext } from "context/Context";
import { PageItem } from "inteafaces/menu.interface";
import { FirstLevelMenu } from "helpers/helpers";
import { FirstLevelMenuItem } from "inteafaces/menu.interface";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

const findIcon = (name: string) => {
  switch (name) {
    case "Курсы":
      return <i className={cn("fa-solid fa-graduation-cap")}></i>;
    case "Книги":
      return <i className={cn("fa-solid fa-book")}></i>;
    case "Товары":
      return <i className={cn("fa-solid fa-box-archive")}></i>;
    case "Сервисы":
      return <i className={cn("fa-solid fa-cloud")}></i>;

    default:
      break;
  }
};

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((menuItem) => {
          if (menuItem._id.secondCategory == secondCategory) {
            menuItem.isOpened = !menuItem.isOpened;
          }
          return menuItem;
        })
      );
  };

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        stagger: 0.1,
      },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },

    hidden: { opacity: 0, height: 0 },
  };

  const buildFirstLevel = () => {
    return (
      <>
        {FirstLevelMenu.map((menuItem) => (
          <div key={menuItem.route}>
            <Link href={`/${menuItem.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menuItem.id == firstCategory,
                })}
              >
                {findIcon(menuItem.name)}
                <span>{menuItem.name}</span>
              </div>
            </Link>

            {menuItem.id == firstCategory && buildSecondLevel(menuItem)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((menuSub) => {
          const t = menuSub.pages
            .map((page) => page.alias)
            .includes(router.asPath.split("/")[2]);

          if (t) {
            menuSub.isOpened = true;
          }

          return (
            <div key={menuSub._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(menuSub._id.secondCategory)}
              >
                {menuSub._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial="hidden"
                animate={menuSub.isOpened ? "visible" : "hidden"}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(menuSub.pages, menuItem.route)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((page) => (
      <motion.div key={page._id} variants={variantsChildren}>
        <Link
          href={`/${route}/${page.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]:
              `/${route}/${page.alias}` == router.asPath,
          })}
        >
          {page.category}
        </Link>
      </motion.div>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
