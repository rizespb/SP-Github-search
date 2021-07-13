import React from "react";
import SearchItem from "./SearchItem";

class SearchItemContainer extends React.Component {
  render() {
    return (
      <SearchItem
        title={this.props.title}
        description={this.props.description}
        url={this.props.url}
        id={this.props.id}
      />
    );
  }
}

export default SearchItemContainer;
