import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import store from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import SearchResults from "./components/SearchResults/SearchResultsContainer";
import RepoContainer from "./components/Repo/RepoContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderContainer />
      <Route exact path="/" render={() => <SearchResults />} />
      <Route path="/repo" render={() => <RepoContainer />} />
    </div>
  );
};

const AppContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default AppContainer;
