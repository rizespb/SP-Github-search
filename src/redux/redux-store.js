import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import searchResultsReducer from "./searchResult-reducer";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  searchResults: searchResultsReducer,
  form: formReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
