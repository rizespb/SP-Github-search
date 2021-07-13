import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";

const SearchItem = (props) => {
  return (
    <div className={styles.searchItem}>
      <Link to={`repo/:${props.id}`} className={styles.searchItem__heading}>
        {props.title}
      </Link>
      <span className={styles.searchItem__description}>
        {props.description}
      </span>
    </div>
  );
};

export default SearchItem;
