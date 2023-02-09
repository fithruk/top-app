import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import ButtonIcon from "@/conponents/ButtonIcon/ButtonIcon";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Header = ({ children, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const router = useRouter();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
      closed: {
        opacity: 0,
        x: "100%",
      },
    },
  };

  useEffect(() => {
    setIsOpened(false);
  }, [router.asPath]);

  return (
    <header {...props}>
      <div className={styles.headerInner}>
        <Image src={logo.src} alt="logo" width={159} height={43} />
        <ButtonIcon
          appearence="ghost"
          icon="burger"
          onClick={() => setIsOpened(true)}
        />
      </div>
      {isOpened && (
        <motion.div
          className={styles.mobileMenu}
          variants={variants}
          initial={"closed"}
          animate={isOpened ? "opened" : "closed"}
        >
          <Sidebar />
          <ButtonIcon
            className={styles.mobileMenuClose}
            appearence="ghost"
            icon="close"
            onClick={() => setIsOpened(false)}
          />
        </motion.div>
      )}
    </header>
  );
};

export default Header;
