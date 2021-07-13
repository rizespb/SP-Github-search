import React from "react";
import { connect } from "react-redux";
import SearchFormRedux from "./SearchForm";
import { makeSearchRequestTC } from "../../../redux/searchResult-reducer";

class SearchFormContainer extends React.Component {
  onSubmit = (formData) => {
    console.log(formData);
    this.props.makeSearchRequest(
      formData.searchKeywords,
      this.props.pageSize,
      this.props.currentPage
    );
  };

  render() {
    return <SearchFormRedux onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = (state) => ({
  pageSize: state.searchResults.pageSize,
  currentPage: state.searchResults.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchRequest: (searchKeywords, pageSize, currentPage) => {
    dispatch(makeSearchRequestTC(searchKeywords, pageSize, currentPage));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormContainer);
