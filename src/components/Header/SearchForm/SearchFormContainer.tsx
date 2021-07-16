import React from "react";
import { connect } from "react-redux";
import SearchFormRedux from "./SearchForm";
import {
  makeSearchRequestTC,
  clearSearchResultsAC,
} from "../../../redux/searchResult-reducer";
import { RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router";
import { TappState } from "../../../redux/redux-store";

interface ImapStateProps {
  pageSize: number;
  currentPage: number;
}

interface ImapDispatchProps {
  makeSearchRequest: (
    searchKeywords: string,
    pageSize: number,
    currentPage: number
  ) => void;
  clearSearchResults: () => void;
}

interface Iprops
  extends ImapStateProps,
    ImapDispatchProps,
    RouteComponentProps {}

class SearchFormContainer extends React.Component<Iprops> {
  onSubmit = (formData: any): void => {
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
    return <SearchFormRedux onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = (state: TappState): ImapStateProps => ({
  pageSize: state.searchResults.pageSize,
  currentPage: state.searchResults.currentPage,
});

const mapDispatchToProps = (dispatch: any): ImapDispatchProps => ({
  makeSearchRequest: (
    searchKeywords: string,
    pageSize: number,
    currentPage: number
  ) => {
    dispatch(makeSearchRequestTC(searchKeywords, pageSize, currentPage));
  },

  clearSearchResults: () => {
    dispatch(clearSearchResultsAC());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchFormContainer) as React.ComponentType;
