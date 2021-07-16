import React from "react";
import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import { makeSearchRequestTC } from "../../redux/searchResult-reducer";
import { setCurrentRepoAC } from "../../redux/currentRepo-reducer";
import { Irepo, IsearchItem } from "../../types/types";
import { TappState } from "../../redux/redux-store";

interface ImapStateProps {
  totalCount: number | null;
  results: IsearchItem[];
  searchKeyWords: string;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
}

interface ImapDispatchProps {
  makeSearchRequest: (
    searchKeyWords: string,
    pageSize: number,
    nextPage: number
  ) => void;
  setCurrentRepo: (repo: Irepo) => void;
}

interface Iprops extends ImapStateProps, ImapDispatchProps {}

class SearchResultsContainer extends React.Component<Iprops> {
  onScroll = (e: any): void => {
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

const mapStateToProps = (state: TappState): ImapStateProps => ({
  totalCount: state.searchResults.totalCount,
  results: state.searchResults.results,
  searchKeyWords: state.searchResults.searchKeyWords,
  pageSize: state.searchResults.pageSize,
  currentPage: state.searchResults.currentPage,
  isFetching: state.searchResults.isFetching,
});

const mapDispatchToProps = (dispatch: any): ImapDispatchProps => ({
  makeSearchRequest: (searchKeyWords, pageSize, nextPage) => {
    dispatch(makeSearchRequestTC(searchKeyWords, pageSize, nextPage));
  },
  setCurrentRepo: (repo) => {
    dispatch(setCurrentRepoAC(repo));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainer);
