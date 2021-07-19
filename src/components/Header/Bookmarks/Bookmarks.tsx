import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Bookmarks.module.css";
import { BookmarkBorder } from "@material-ui/icons";
import { IsearchItem } from "../../../types/types";

interface Iprops {
  favorites: Array<IsearchItem>;
  removeFormFavorites: (e: any) => void;
}

const Bookmarks: React.FC<Iprops> = (props) => {
  let [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  const showModalToggle = () => {
    setIsShowingModal(!isShowingModal);
  };

  const hideshowModal = () => {
    setIsShowingModal(false);
  };

  const favoritesArray: Array<JSX.Element> = props.favorites.map((el: any) => (
    <div
      className={`${styles.bookmark} bookmark`}
      data-id={el.id}
      key={`key-${el.id}`}
    >
      <Link
        to={`/repo/${el.full_name}`}
        className={styles.bookmark__heading}
        onClick={hideshowModal}
      >
        {el.full_name}
      </Link>
      <div className={styles.bookmark__description}>{el.description}</div>
      <div
        className={styles.bookmark__removeFromFavorite}
        onClick={props.removeFormFavorites}
      >
        Remove from Favorites
      </div>
    </div>
  ));

  return (
    <div className={styles.bookmarks}>
      <BookmarkBorder
        className={styles.bookmarks__icon}
        onClick={showModalToggle}
      />

      <div
        className={`${styles.bookmarks__container} ${
          isShowingModal ? styles.bookmarks__containerDisplay : ""
        }`}
        onMouseLeave={hideshowModal}
      >
        {favoritesArray.length > 0 ? favoritesArray : "No bookmarks were added"}
      </div>
    </div>
  );
};

export default Bookmarks;
