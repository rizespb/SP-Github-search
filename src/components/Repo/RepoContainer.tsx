import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import Repo from "./Repo";
import { RouteComponentProps } from "react-router-dom";
import { getRepoTC } from "../../redux/currentRepo-reducer";
import { clearCurrentRepoAC } from "../../redux/currentRepo-reducer";
import { TappState } from "../../redux/redux-store";

interface ImapStateProps {
  title: string;
  tags: Array<string>;
  langs: Array<string>;
  description: string;
  ownerName: string;
  ownerImg: string;
}

interface ImapDispatchProps {
  getRepo: (fullName: string) => void;
  clearCurrentRepo: () => void;
}

interface Iprops
  extends ImapStateProps,
    ImapDispatchProps,
    RouteComponentProps {}

class RepoContainer extends React.Component<Iprops> {
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

const mapStateToProps = (state: TappState): ImapStateProps => ({
  title: state.repo.currentRepo.title,
  tags: state.repo.currentRepo.tags,
  langs: state.repo.currentRepo.langs,
  description: state.repo.currentRepo.description,
  ownerName: state.repo.currentRepo.ownerName,
  ownerImg: state.repo.currentRepo.ownerImg,
});

const mapDispatchToProps = (dispatch: any): ImapDispatchProps => ({
  getRepo: (fullName: string) => {
    dispatch(getRepoTC(fullName));
  },

  clearCurrentRepo: () => {
    dispatch(clearCurrentRepoAC());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(RepoContainer) as React.ComponentType;
