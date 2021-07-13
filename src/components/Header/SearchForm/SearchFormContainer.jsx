import React from "react";
import { connect } from "react-redux";
import SearchFormRedux from "./SearchForm";
import { makeSearchRequestTC } from "../../../redux/searchResult-reducer";

class SearchFormContainer extends React.Component {
  onSubmit = (formData) => {
    console.log(formData);
    this.props.makeSearchRequest(formData.searchKeywords);
  };

  render() {
    return <SearchFormRedux onSubmit={this.onSubmit} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  makeSearchRequest: (searchKeywords) => {
    dispatch(makeSearchRequestTC(searchKeywords));
  },
});

export default connect(null, mapDispatchToProps)(SearchFormContainer);
