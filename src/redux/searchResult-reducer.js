import { reset } from "redux-form";
import { searchAPI } from "../api/api";

const SET_SEARCH_RESULTS = "searchResult/SET_SEARCH_RESULTS";

const intialState = {
  results: [],
  totalCount: null,
};

const searchResultsReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: [...action.results],
        totalCount: action.totalCount,
      };
    default:
      return state;
  }
};

////////////////////////////////
// ActionCreators
const setSearchResultsAC = (results, totalCount) => ({
  type: SET_SEARCH_RESULTS,
  results,
  totalCount,
});

////////////////////////////////
// ThunkCreators

export const makeSearchRequestTC = (searchKeyWords) => {
  return async (dispatch) => {
    dispatch(reset("search"));
    const response = await searchAPI.getRepos(searchKeyWords);
    console.log(response);
    if (response.status === 200) {
      dispatch(
        setSearchResultsAC(response.data.items, response.data.total_count)
      );
    }
  };
};

export default searchResultsReducer;
