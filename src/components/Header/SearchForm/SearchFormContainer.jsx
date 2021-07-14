import React from "react";
import { connect } from "react-redux";
import SearchFormRedux from "./SearchForm";
import {
  makeSearchRequestTC,
  clearSearchResultsAC,
} from "../../../redux/searchResult-reducer";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router";

class SearchFormContainer extends React.Component {


  onSubmit = (formData) => {
    console.log(formData);

    // Очищаем результаты предыдущего запроса
    this.props.clearSearchResults();

    // Делаем новый запрос
    this.props.makeSearchRequest(
      formData.searchKeywords,
      this.props.pageSize,
      0
    );

    this.props.history.push("/");

 
  };

  render() {
    return (
        
        <SearchFormRedux onSubmit={this.onSubmit} />
    );
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

  clearSearchResults: () => {
    dispatch(clearSearchResultsAC());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchFormContainer);
