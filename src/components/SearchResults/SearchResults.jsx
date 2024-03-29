import React from "react";
import styles from "./SearchResults.module.css";
import SearchItemContainer from "./SearchItem/SearchItemContainer";

const SearchResults = (props) => {
  const hasResults = !!props.totalCount;

  let resultsArr;
  if (hasResults) {
    resultsArr = props.results.map((el) => (
      <SearchItemContainer
        title={el.full_name}
        description={el.description}
        url={el.url}
        key={el.id}
        id={el.id}
      />
    ));
  }

  return (
    <div className={styles.searchResults} onClick={props.onClick}>
      {hasResults && (
        <div className={styles.searchResults__heading}>
          {props.totalCount.toLocaleString("en")} repository results
        </div>
      )}

      {hasResults && (
        <div className={styles.searchResults__results}>{resultsArr}</div>
      )}
    </div>
  );
};

export default SearchResults;
