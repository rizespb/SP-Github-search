import React from "react";
import { connect } from "react-redux";
import { TappState } from "../../../redux/redux-store";
import { IsearchItem } from "../../../types/types";
import SearchItem from "./SearchItem";

interface ImapStateProps {
  favorites: Array<IsearchItem>;
}

interface Iprops extends ImapStateProps {
  title: string;
  description: string;
  id: number;
}

class SearchItemContainer extends React.Component<Iprops> {
  render() {
    return (
      <SearchItem
        title={this.props.title}
        description={this.props.description}
        id={this.props.id}
        favorites={this.props.favorites}
      />
    );
  }
}

const mapStateToProps = (state: TappState): ImapStateProps => ({
  favorites: state.bookmarks.favorites,
});

export default connect(mapStateToProps, {})(SearchItemContainer);
