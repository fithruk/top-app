import { SidebarProps } from "./Sidebar.props";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "../Menu/Menu";
import cn from "classnames";
import styles from "./Sidebar.module.css";
import logo from "../../../public/logo.png";
import Search from "@/conponents/Search/Search";

const Sidebar = ({
  children,
  className,
  ...props
}: SidebarProps): JSX.Element => {
  return (
    <aside className={cn(className, styles.sidebar)} {...props}>
      <Link href={"/"}>
        <Image
          src={logo.src}
          alt="logo"
          className={styles.logo}
          width={159}
          height={42}
        />
      </Link>
      <Search />
      <Menu />
    </aside>
  );
};

export default Sidebar;
