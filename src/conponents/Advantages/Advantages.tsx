import { AdvantagesProps } from "./Advantages.props";
import { TopPageAdvantage } from "inteafaces/page.interface";
import styles from "./Advantages.module.css";
import Hteg from "../Hteg/Hteg";
import check from "../../../public/checkIcon.png";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      <Hteg tag="h2">Преимущества</Hteg>
      {advantages.map((advantage) => (
        <Wiew key={advantage._id} {...advantage} />
      ))}
    </>
  );
};

const Wiew = (advantage: TopPageAdvantage): JSX.Element => {
  return (
    <div className={styles.advantage}>
      <img src={check.src} alt="icon" />
      <div className={styles.title}>{advantage.title}</div>
      {advantage.description !== "" && <hr className={styles.vline} />}
      <div className={styles.deccription}>{advantage.description}</div>
    </div>
  );
};
