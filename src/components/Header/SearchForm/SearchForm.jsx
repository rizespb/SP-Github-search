import React from "react";
import styles from "./SearchForm.module.css";
import { reduxForm, Field } from "redux-form";

const SearchForm = (props) => {
  return (
    <form className={styles.searchForm} onSubmit={props.handleSubmit}>
      <Field
        component={"input"}
        name={"searchKeywords"}
        placeholder={"Type your search request here"}
        className={styles.searchForm__input}
      />
      <button className={styles.searchForm__button}>Search</button>
    </form>
  );
};

const SearchFormRedux = reduxForm({
  form: "search",
})(SearchForm);

export default SearchFormRedux;
