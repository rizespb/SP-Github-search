import React from "react";
import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import { makeSearchRequestTC } from "../../redux/searchResult-reducer";
import { setCurrentRepoAC } from "../../redux/currentRepo-reducer";
import { Irepo, IsearchItem } from "../../types/types";
import { TappState } from "../../redux/redux-store";
import {
  addRepoToFavoritesTC,
  removeRepoFromFavoritesTC,
} from "../../redux/favorites-reducer";

interface ImapStateProps {
  totalCount: number | null;
  results: IsearchItem[];
  searchKeyWords: string;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  favorites: Array<IsearchItem>;
}

interface ImapDispatchProps {
  makeSearchRequest: (
    searchKeyWords: string,
    pageSize: number,
    nextPage: number
  ) => void;
  setCurrentRepo: (repo: Irepo) => void;
  addRepoToFavorites: (repo: IsearchItem) => void;
  removeRepoFromFavorites: (id: number) => void;
}

interface Iprops extends ImapStateProps, ImapDispatchProps {}

class SearchResultsContainer extends React.Component<Iprops> {
  // Динамическая подгрузка результатов поиска
  onScroll = (e: any): void => {
    if (this.props.results.length === 0) return;

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

  onClickFavorite = (e: any): void => {
    const target = e.target;
    if (target.classList.contains("addToFavorite")) {
      const repoId: number = Number(target.closest(".searchItem").dataset.id);
      const choosenRepo: any = this.props.results.find(
        (el) => el.id === repoId
      );

      this.props.addRepoToFavorites(choosenRepo);
    } else if (target.classList.contains("removeFromFavorite")) {
      const repoId: number = Number(target.closest(".searchItem").dataset.id);
      this.props.removeRepoFromFavorites(repoId);
    }
  };

  componentDidMount() {
    document.addEventListener("scroll", this.onScroll);
    document.addEventListener("click", this.onClickFavorite);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("click", this.onClickFavorite);
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
  favorites: state.bookmarks.favorites,
});

const mapDispatchToProps = (dispatch: any): ImapDispatchProps => ({
  makeSearchRequest: (searchKeyWords, pageSize, nextPage) => {
    dispatch(makeSearchRequestTC(searchKeyWords, pageSize, nextPage));
  },

  setCurrentRepo: (repo) => {
    dispatch(setCurrentRepoAC(repo));
  },

  addRepoToFavorites: (repo) => {
    dispatch(addRepoToFavoritesTC(repo));
  },

  removeRepoFromFavorites: (id) => {
    dispatch(removeRepoFromFavoritesTC(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainer);
