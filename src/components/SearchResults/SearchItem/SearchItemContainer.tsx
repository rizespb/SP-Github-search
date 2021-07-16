import React from "react";
import SearchItem from "./SearchItem";

interface Iprops {
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
      />
    );
  }
}

export default SearchItemContainer;
