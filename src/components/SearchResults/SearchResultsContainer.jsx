import React from "react";
import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import { makeSearchRequestTC } from "../../redux/searchResult-reducer";

class SearchResultsContainer extends React.Component {
  onScroll = (e) => {
    // Высота всего документа
    const scrollHeight = e.target.documentElement.scrollHeight;
    // Высота окна браузера
    const windowHeight = window.innerHeight;
    // Высота при скролле вверху страницы
    const currentTopPosition = e.target.documentElement.scrollTop;

    if (
      scrollHeight - windowHeight - currentTopPosition <= 200 &&
      !this.props.isFetching
    )
      this.props.makeSearchRequest(
        this.props.searchKeyWords,
        this.props.pageSize,
        this.props.currentPage
      );
  };

  componentDidMount() {
    document.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.onScroll);
  }

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
  searchKeyWords: state.searchResults.searchKeyWords,
  pageSize: state.searchResults.pageSize,
  currentPage: state.searchResults.currentPage,
  isFetching: state.searchResults.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchRequest: (searchKeyWords, pageSize, nextPage) => {
    dispatch(makeSearchRequestTC(searchKeyWords, pageSize, nextPage));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainer);
