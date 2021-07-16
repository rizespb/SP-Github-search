import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SearchFormContainer from "./SearchForm/SearchFormContainer";
import logo from "./../../assets/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} className={styles.header__logo} />
      </Link>

      <SearchFormContainer />
    </header>
  );
};

export default Header;
