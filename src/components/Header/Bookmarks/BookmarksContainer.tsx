import React from "react";
import { connect } from "react-redux";
import { removeRepoFromFavoritesTC } from "../../../redux/favorites-reducer";
import { TappState } from "../../../redux/redux-store";
import { IsearchItem } from "../../../types/types";
import Bookmarks from "./Bookmarks";

interface ImapStateProps {
  favorites: Array<IsearchItem>;
}

interface ImapDispatchProps {
  removeRepoFromFavorites: (repoId: number) => void;
}

interface Iprops extends ImapStateProps, ImapDispatchProps {}

class BookmarksContainer extends React.Component<Iprops> {
  removeFormFavorites = (e: any): void => {
    const repoId: number = Number(e.target.closest(".bookmark").dataset.id);
    this.props.removeRepoFromFavorites(repoId);
  };

  render() {
    return (
      <Bookmarks
        favorites={this.props.favorites}
        removeFormFavorites={this.removeFormFavorites}
      />
    );
  }
}

const mapStateToProps = (state: TappState): ImapStateProps => ({
  favorites: state.bookmarks.favorites,
});

const mapStateToDispatch = (dispatch: any): ImapDispatchProps => ({
  removeRepoFromFavorites: (repoId) => {
    dispatch(removeRepoFromFavoritesTC(repoId));
  },
});

export default connect(mapStateToProps, mapStateToDispatch)(BookmarksContainer);
