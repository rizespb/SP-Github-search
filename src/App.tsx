import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import store from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import SearchResults from "./components/SearchResults/SearchResultsContainer";
import RepoContainer from "./components/Repo/RepoContainer";
import { setFavoritesAC } from "./redux/favorites-reducer";

const App: React.FC = () => {
  // Создаем массив начальных значений для bookmarks, хранимыхв localStorage
  const [initFavorites, setInitFavorites] = useState([]);

  // Проверяем, есть ли в локальнои хранилище данные о bookmarks
  useEffect(() => {
    const localArray: string | null = localStorage.getItem("favoritesLocal");
    if (localArray !== null) setInitFavorites(JSON.parse(localArray));
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFavoritesAC(initFavorites));
  }, [initFavorites]);

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
