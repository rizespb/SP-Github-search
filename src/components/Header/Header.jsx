import React from "react";
import styles from "./Header.module.css";
import SearchFormContainer from "./SearchForm/SearchFormContainer";
import logo from "./../../assets/images/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.header__logo} />

      <SearchFormContainer />
    </header>
  );
};

export default Header;
