import Paragraph from "@/conponents/Paragraph/Paragraph";
import styles from "./Footer.module.css";

const FooterInner = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Paragraph size="s">
          OwlTop © 2020 - {new Date().getFullYear()} Все права защищены
        </Paragraph>
      </div>
      <div>
        <Paragraph size="s">
          <a href="#" className={styles.link}>
            Пользовательское соглашение
          </a>
        </Paragraph>
      </div>
      <div>
        <Paragraph size="s">
          <a href="#" className={styles.link}>
            Политика конфиденциальности
          </a>
        </Paragraph>
      </div>
    </div>
  );
};

export default FooterInner;
