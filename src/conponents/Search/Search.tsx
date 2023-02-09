import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import Input from "../Input/Input";
import Button from "../Button/Button";
import glass from "../../../public/glass.png";
import { useState, KeyboardEvent } from "react";
import Router from "next/router";

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [seacrh, setSeach] = useState<string>("");

  const goToSearch = () => {
    Router.push({
      pathname: "/search",
      query: {
        q: seacrh,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input
        placeholder="Поиск..."
        value={seacrh}
        onChange={(e) => setSeach(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearence="primary"
        className={cn(styles.button)}
        onClick={() => {
          goToSearch();
        }}
      >
        <img src={glass.src} alt="search icon" className={styles.buttonImg} />
      </Button>
    </div>
  );
};

export default Search;
