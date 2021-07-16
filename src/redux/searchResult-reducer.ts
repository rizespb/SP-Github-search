import { reset } from "redux-form";
import { searchAPI } from "../api/api";
import { IsearchItem } from "../types/types";

const SET_SEARCH_RESULTS = "searchResult/SET_SEARCH_RESULTS";
const SET_SEARCH_KEY_WORDS = "searchResult/SET_SEARCH_KEY_WORDS";
const FETCHING_TOGGLE = "searchResult/FETCHING_TOGGLE";
const CLEAR_SEARCH_RESULTS = "searchResult/CLEAR_SEARCH_RESULTS";

const intialState = {
  results: [] as Array<IsearchItem>,
  totalCount: null as number | null,
  pageSize: 20,
  currentPage: 0,
  searchKeyWords: "",
  isFetching: false,
};

type TintialState = typeof intialState;

const searchResultsReducer = (
  state = intialState,
  action: any
): TintialState => {
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
// Save search key words to state
interface IsetSearchKeyWordsAC {
  type: typeof SET_SEARCH_KEY_WORDS;
  searchKeyWords: string;
}
const setSearchKeyWordsAC = (searchKeyWords: string): IsetSearchKeyWordsAC => ({
  type: SET_SEARCH_KEY_WORDS,
  searchKeyWords,
});

// Save search results to state
interface IsetSearchResultsAC {
  type: typeof SET_SEARCH_RESULTS;
  results: Array<IsearchItem>;
  totalCount: number;
}
const setSearchResultsAC = (
  results: any,
  totalCount: number
): IsetSearchResultsAC => ({
  type: SET_SEARCH_RESULTS,
  results,
  totalCount,
});

// Clear search result in state
interface IclearSearchResultsAC {
  type: typeof CLEAR_SEARCH_RESULTS;
}
export const clearSearchResultsAC = (): IclearSearchResultsAC => ({
  type: CLEAR_SEARCH_RESULTS,
});

// Toggle isFetching on/off during search request
interface IfetchingToggleAC {
  type: typeof FETCHING_TOGGLE;
}
const fetchingToggleAC = (): IfetchingToggleAC => ({
  type: FETCHING_TOGGLE,
});

////////////////////////////////
// ThunkCreators

export const makeSearchRequestTC = (
  searchKeyWords: string,
  pageSize: number,
  currentPage: number
) => {
  return async (dispatch: any) => {
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
      const results: Array<IsearchItem> = response.data.items.map(
        (el: any): IsearchItem => ({
          id: el.id,
          full_name: el.full_name,
          description: el.description,
        })
      );

      dispatch(setSearchResultsAC(results, response.data.total_count));
    }

    dispatch(fetchingToggleAC());
  };
};

export default searchResultsReducer;
