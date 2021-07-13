import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";

const SearchItem = (props) => {
  return (
    <div className={styles.searchItem} id={props.id} type="SearchItem">
      <Link
        to={`repo/${props.title}`}
        className={styles.searchItem__heading}
        onClick={props.setCurrentRepo}
      >
        {props.title}
      </Link>
      <span className={styles.searchItem__description}>
        {props.description}
      </span>
    </div>
  );
};

export default SearchItem;
