import { repoAPI } from "../api/api";
import { Irepo } from "../types/types";

const SET_CURRENT_REPO = "currentRepo/SET_CURRENT_REPO";
const SET_CURRENT_REPO_ADDITIONAL_INFO =
  "currentRepo/SET_CURRENT_REPO_ADDITIONAL_INFO";
const CLEAR_CURRENT_REPO = "currentRepo/CLEAR_CURRENT_REPO";

const intialState = {
  currentRepo: {
    title: "",
    tags: [],
    langs: [],
    description: "",
    ownerName: "",
    ownerImg: "",
  } as Irepo,
  tagsAPI: "",
  langsAPI: "",
};

type TintialState = typeof intialState;

const currrentRepoReducer = (
  state = intialState,
  action: any
): TintialState => {
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
          tags: [],
          langs: [],
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
// Set current repo to state
interface IsetCurrentRepoAC {
  type: typeof SET_CURRENT_REPO;
  item: Irepo;
}
export const setCurrentRepoAC = (item: Irepo): IsetCurrentRepoAC => ({
  type: SET_CURRENT_REPO,
  item,
});

// Set additional repo info to state
interface IsetCurrentRepoInfoAC {
  type: typeof SET_CURRENT_REPO_ADDITIONAL_INFO;
  payload: { tags: Array<string>; langs: Array<string> };
}
const setCurrentRepoInfoAC = (
  tags: Array<string>,
  langs: Array<string>
): IsetCurrentRepoInfoAC => ({
  type: SET_CURRENT_REPO_ADDITIONAL_INFO,
  payload: { tags, langs },
});

// Clear current repo in state
interface IclearCurrentRepoAC {
  type: typeof CLEAR_CURRENT_REPO;
}
export const clearCurrentRepoAC = (): IclearCurrentRepoAC => ({
  type: CLEAR_CURRENT_REPO,
});

////////////////////////////////
// ThunkCreators
export const getRepoTC = (repoFullName: string) => {
  return async (dispatch: any) => {
    const repo = await repoAPI.getRepoByFullName(repoFullName);
    dispatch(setCurrentRepoAC(repo.data));

    const response = await Promise.all([
      repoAPI.getRepoInfo(repo.data.tags_url),
      repoAPI.getRepoInfo(repo.data.languages_url),
    ]);

    const tags: Array<string> = response[0].data.map((el: any) => {
      return el.name;
    });

    const langs: Array<string> = Object.keys(response[1].data);

    dispatch(setCurrentRepoInfoAC(tags, langs));
  };
};

// export getRepoInfo

export default currrentRepoReducer;
