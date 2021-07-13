import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import store from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import SearchResults from "./components/SearchResults/SearchResultsContainer";

function App() {
  return (
    <div className="App">
      <HeaderContainer />
      <SearchResults />
    </div>
  );
}

const AppContainer = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default AppContainer;
