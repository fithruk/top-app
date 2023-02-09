import { FC } from "react";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import { AppContextProvider, IAppContext } from "context/Context";

import { LayoutProps } from "./Layout.props";
import { TopPageProps } from "@/pages/[type]/[alias]";
import FooterInner from "./Footer/Footer.inner";
import styles from "./Layout.module.css";

const Layout = ({ children, ...props }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.container} {...props}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer}>
        <FooterInner />
      </Footer>
    </div>
  );
};

const wistLayout = <
  T extends Record<string, unknown> & IAppContext & TopPageProps
>(
  Component: FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};

export default wistLayout;
