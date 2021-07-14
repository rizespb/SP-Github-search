import { repoAPI } from "../api/api";

const SET_CURRENT_REPO = "currentRepo/SET_CURRENT_REPO";
const SET_CURRENT_REPO_ADDITIONAL_INFO =
  "currentRepo/SET_CURRENT_REPO_ADDITIONAL_INFO";
const CLEAR_CURRENT_REPO = "currentRepo/CLEAR_CURRENT_REPO";

const intialState = {
  currentRepo: {
    title: "",
    tags: "",
    langs: "",
    description: "",
    ownerName: "",
    ownerImg: "",
  },
  tagsAPI: "",
  langsAPI: "",
};

const currrentRepoReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_CURRENT_REPO:
      return {
        ...state,
        currentRepo: {
          ...state.currentRepo,
          title: action.item.name,
          description: action.item.description,
          ownerName: action.item.owner.login,
          ownerImg: action.item.owner.avatar_url,
        },
        tagsAPI: action.item.tags_url,
        langsAPI: action.item.languages_url,
      };

    case SET_CURRENT_REPO_ADDITIONAL_INFO:
      return {
        ...state,
        currentRepo: {
          ...state.currentRepo,
          tags: action.payload.tags,
          langs: action.payload.langs,
        },
      };

    case CLEAR_CURRENT_REPO: {
      return {
        currentRepo: {
    title: "",
    tags: "",
    langs: "",
    description: "",
    ownerName: "",
    ownerImg: "",
  },
        tagsAPI: "",
        langsAPI: "",
      };
    }

    default:
      return state;
  }
};

////////////////////////////////
// ActionCreators
export const setCurrentRepoAC = (item) => ({
  type: SET_CURRENT_REPO,
  item,
});

const setCurrentRepoInfoAC = (tags, langs) => ({
  type: SET_CURRENT_REPO_ADDITIONAL_INFO,
  payload: { tags, langs },
});

export const clearCurrentRepoAC = () => ({
  type: CLEAR_CURRENT_REPO,
});

////////////////////////////////
// ThunkCreators
export const getRepoTC = (repoFullName) => {
  return async (dispatch) => {
    const repo = await repoAPI.getRepoByFullName(repoFullName);
    console.log(repo);
    dispatch(setCurrentRepoAC(repo.data));

    const response = await Promise.all([
      repoAPI.getRepoInfo(repo.data.tags_url),
      repoAPI.getRepoInfo(repo.data.languages_url),
    ]);

    console.log(response);
    dispatch(setCurrentRepoInfoAC(response[0].data, response[1].data));
  };
};

// export getRepoInfo

export default currrentRepoReducer;
