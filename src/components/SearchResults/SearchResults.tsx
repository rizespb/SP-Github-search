import React from "react";
import styles from "./SearchResults.module.css";
import SearchItemContainer from "./SearchItem/SearchItemContainer";
import { IsearchItem } from "../../types/types";

interface Iprops {
  totalCount: number | null;
  results: Array<IsearchItem>;
}

const SearchResults: React.FC<Iprops> = (props) => {
  const hasResults = !!props.totalCount;

  let resultsArr;
  if (hasResults) {
    resultsArr = props.results.map((el) => (
      <SearchItemContainer
        title={el.full_name}
        description={el.description}
        key={`key-${el.id}`}
        id={el.id}
      />
    ));
  }

  return (
    <div className={styles.searchResults}>
      {hasResults && (
        <div className={styles.searchResults__heading}>
          {props.totalCount !== null && props.totalCount.toLocaleString("en")}{" "}
          repository results
        </div>
      )}

      {hasResults && (
        <div className={styles.searchResults__results}>{resultsArr}</div>
      )}
    </div>
  );
};

export default SearchResults;
