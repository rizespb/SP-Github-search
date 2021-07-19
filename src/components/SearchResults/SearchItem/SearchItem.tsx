import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IsearchItem } from "../../../types/types";
import styles from "./SearchItem.module.css";

interface Iprops {
  title: string;
  description: string;
  id: number;
  favorites: Array<IsearchItem>;
}

const SearchItem: React.FC<Iprops> = (props) => {
  const isInFavorite = !!props.favorites.filter((el) => el.id === props.id)
    .length;

  return (
    <div className={`${styles.searchItem} searchItem`} data-id={props.id}>
      <Link to={`repo/${props.title}`} className={styles.searchItem__heading}>
        {props.title}
      </Link>
      <div className={styles.searchItem__description}>{props.description}</div>
      {isInFavorite ? (
        <div
          className={`${styles.searchItem__addToFavorite} removeFromFavorite`}
        >
          Remove from Favorites
        </div>
      ) : (
        <div className={`${styles.searchItem__addToFavorite} addToFavorite`}>
          Add to Favorites
        </div>
      )}
    </div>
  );
};

export default SearchItem;
