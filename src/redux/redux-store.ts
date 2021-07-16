import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import searchResultsReducer from "./searchResult-reducer";
import currrentRepoReducer from "./currentRepo-reducer";
import { reducer as formReducer } from "redux-form";

const rootReducers = combineReducers({
  searchResults: searchResultsReducer,
  repo: currrentRepoReducer,
  form: formReducer,
});

// Создаем тип TrootReducers, который будет строиться на основе rootReducer
// Тип TrootReducers - это функция, которая возвращает state
type TrootReducers = typeof rootReducers;

// ReturnType - получи тип того, что возвращает RootReducerType
export type TappState = ReturnType<TrootReducers>;

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
export type TappStore = typeof store;

export default store;
