import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import Repo from "./Repo";
import { getRepoTC } from "../../redux/currentRepo-reducer";
import { clearCurrentRepoAC } from "../../redux/currentRepo-reducer";

class RepoContainer extends React.Component {
  state = {
    repoFullName: this.props.location.pathname.slice(6),
  };

  componentDidMount() {
    this.props.getRepo(this.state.repoFullName);
  }

  componentWillUnmount() {
    this.props.clearCurrentRepo();
  }

  render() {
    console.log(this.state.repoFullName);
    return (
      <Repo
        title={this.props.title}
        description={this.props.description}
        ownerName={this.props.ownerName}
        ownerImg={this.props.ownerImg}
        tags={this.props.tags}
        langs={this.props.langs}
      />
    );
  }
}

const mapStateToProps = (state) =>({
  title: state.repo.currentRepo.title,
  tags: state.repo.currentRepo.tags,
  langs: state.repo.currentRepo.langs,
  description: state.repo.currentRepo.description,
  ownerName: state.repo.currentRepo.ownerName,
  ownerImg: state.repo.currentRepo.ownerImg,
});

const mapDispatchToProps = (dispatch) => ({
  getRepo: (fullName) => {
    dispatch(getRepoTC(fullName));
  },

  clearCurrentRepo: () => {
    dispatch(clearCurrentRepoAC());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(RepoContainer);
