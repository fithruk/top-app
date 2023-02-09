import Image from "next/image";
import { HhDataProps } from "./HhData.props";
import styles from "./HhData.module.css";
import cn from "classnames";
import Card from "../Card/Card";
import starEmpty from "../../../public/star_empty.png";
import starFilled from "../../../public/star_filled.png";
const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps) => {
  return (
    <div className={styles.hh}>
      <Card color="white" className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card color="white" className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{juniorSalary}</div>
          <div className={styles.rate}>
            <Image src={starFilled.src} alt="star" width={20} height={20} />
            <Image src={starEmpty.src} alt="star" width={20} height={20} />
            <Image src={starEmpty.src} alt="star" width={20} height={20} />
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{middleSalary}</div>
          <div className={styles.rate}>
            <Image src={starFilled.src} alt="star" width={20} height={20} />
            <Image src={starFilled.src} alt="star" width={20} height={20} />
            <Image src={starEmpty.src} alt="star" width={20} height={20} />
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{seniorSalary}</div>
          <div className={styles.rate}>
            <Image src={starFilled.src} alt="star" width={20} height={20} />
            <Image src={starFilled.src} alt="star" width={20} height={20} />
            <Image src={starFilled.src} alt="star" width={20} height={20} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HhData;
