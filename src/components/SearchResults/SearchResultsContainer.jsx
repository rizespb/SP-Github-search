import React from "react";
import { connect } from "react-redux";
import SearchResults from "./SearchResults";

class SearchResultsContainer extends React.Component {
  render() {
    return (
      <SearchResults
        totalCount={this.props.totalCount}
        results={this.props.results}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  totalCount: state.searchResults.totalCount,
  results: state.searchResults.results,
});

export default connect(mapStateToProps)(SearchResultsContainer);
