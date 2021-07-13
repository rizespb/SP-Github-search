import { reset } from "redux-form";
import { searchAPI } from "../api/api";

const SET_SEARCH_RESULTS = "searchResult/SET_SEARCH_RESULTS";
const SET_SEARCH_KEY_WORDS = "searchResult/SET_SEARCH_KEY_WORDS";
const FETCHING_TOGGLE = "searchResult/FETCHING_TOGGLE";
const CLEAR_SEARCH_RESULTS = "searchResult/CLEAR_SEARCH_RESULTS";

const intialState = {
  results: [],
  totalCount: null,
  pageSize: 20,
  currentPage: 0,
  searchKeyWords: "",
  isFetching: false,
};

const searchResultsReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.results],
        totalCount: action.totalCount,
        currentPage: ++state.currentPage,
      };

    case SET_SEARCH_KEY_WORDS:
      return {
        ...state,
        searchKeyWords: action.searchKeyWords,
      };

    case FETCHING_TOGGLE:
      return {
        ...state,
        isFetching: !state.isFetching,
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        results: [],
        totalCount: null,
        searchKeyWords: "",
        currentPage: 0,
      };

    default:
      return state;
  }
};

////////////////////////////////
// ActionCreators

const setSearchKeyWordsAC = (searchKeyWords) => ({
  type: SET_SEARCH_KEY_WORDS,
  searchKeyWords,
});

const setSearchResultsAC = (results, totalCount) => ({
  type: SET_SEARCH_RESULTS,
  results,
  totalCount,
});

export const clearSearchResultsAC = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

const fetchingToggleAC = () => ({ type: FETCHING_TOGGLE });

////////////////////////////////
// ThunkCreators

export const makeSearchRequestTC = (searchKeyWords, pageSize, currentPage) => {
  return async (dispatch) => {
    dispatch(setSearchKeyWordsAC(searchKeyWords));

    dispatch(reset("search"));

    dispatch(fetchingToggleAC());
    const response = await searchAPI.getRepos(
      searchKeyWords,
      pageSize,
      currentPage + 1
    );
    console.log(response);
    if (response.status === 200) {
      dispatch(
        setSearchResultsAC(response.data.items, response.data.total_count)
      );
    }

    dispatch(fetchingToggleAC());
  };
};

export const getRepoByIdTC = (id) => {
  return (dispatch) => {};
};

export default searchResultsReducer;
