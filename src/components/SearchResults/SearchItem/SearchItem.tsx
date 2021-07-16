import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";

interface Iprops {
  title: string;
  description: string;
  id: number;
}

const SearchItem: React.FC<Iprops> = (props) => {
  return (
    // @ts-ignore
    <div className={styles.searchItem} id={props.id} type="SearchItem">
      <Link to={`repo/${props.title}`} className={styles.searchItem__heading}>
        {props.title}
      </Link>
      <span className={styles.searchItem__description}>
        {props.description}
      </span>
    </div>
  );
};

export default SearchItem;
