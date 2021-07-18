import { repoAPI } from "../api/api";
import { IsearchItem } from "../types/types";

const ADD_REPO_TO_FAVORITES = "favorites/ADD_REPO_TO_FAVORITES";
const REMOVE_REPO_FROM_FAVORITES = "favorites/REMOVE_REPO_FROM_FAVORITES";
const SET_FAVORITES_FROM_LOCAL = "favorites/SET_FAVORITES_FROM_LOCAL";

const intialState = {
  favorites: [] as Array<IsearchItem>,
};

type TintialState = typeof intialState;

const favoriteReducer = (state = intialState, action: any): TintialState => {
  switch (action.type) {
    case ADD_REPO_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.repo],
      };

    case REMOVE_REPO_FROM_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites.filter((el) => el.id !== action.id)],
      };

    case SET_FAVORITES_FROM_LOCAL:
      return {
        ...state,
        favorites: [...action.data],
      };

    default:
      return state;
  }
};

////////////////////////////////
// ActionCreators

// Set data from localStorage
interface IsetFavorites {
  type: typeof SET_FAVORITES_FROM_LOCAL;
  data: Array<IsearchItem>;
}

export const setFavoritesAC = (data: Array<IsearchItem>): IsetFavorites => ({
  type: SET_FAVORITES_FROM_LOCAL,
  data,
});

// Add item to favorites array
interface IaddRepoToFavoritesAС {
  type: typeof ADD_REPO_TO_FAVORITES;
  repo: IsearchItem;
}

export const addRepoToFavoritesAC = (
  repo: IsearchItem
): IaddRepoToFavoritesAС => ({
  type: ADD_REPO_TO_FAVORITES,
  repo,
});

// Remove item from favorites array
interface IremoveRepoFromFavoritesAС {
  type: typeof REMOVE_REPO_FROM_FAVORITES;
  id: number;
}

export const removeRepoFromFavoritesAС = (
  id: number
): IremoveRepoFromFavoritesAС => ({
  type: REMOVE_REPO_FROM_FAVORITES,
  id,
});

////////////////////////////////
// Thunk Creators

const updateLocalStorage = (favoritesArray: Array<IsearchItem>) => {
  localStorage.setItem("favoritesLocal", JSON.stringify(favoritesArray));

  const localArray: string | null = localStorage.getItem("favoritesLocal");
  if (localArray !== null) console.log(JSON.parse(localArray));
};

export const addRepoToFavoritesTC = (repo: IsearchItem) => {
  return (dispatch: any, getState: any) => {
    dispatch(addRepoToFavoritesAC(repo));

    updateLocalStorage(getState().bookmarks.favorites);
  };
};

export const removeRepoFromFavoritesTC = (repoId: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(removeRepoFromFavoritesAС(repoId));

    updateLocalStorage(getState().bookmarks.favorites);
  };
};

export default favoriteReducer;
