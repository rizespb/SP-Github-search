import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SearchFormContainer from "./SearchForm/SearchFormContainer";
import logo from "./../../assets/images/logo.png";
import BookmarksContainer from "./Bookmarks/BookmarksContainer";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} className={styles.header__logo} alt="Logo" />
      </Link>

      <SearchFormContainer />
      <BookmarksContainer />
    </header>
  );
};

export default Header;
