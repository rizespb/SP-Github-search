import axios from "axios";

const my_token = "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";

const instance = axios.create({
  baseURL: "https://api.github.com/",
  // withCredentials: true,
  headers: {
    Authorization: `token ${my_token}`,
  },
});

interface IsearchAPI {
  getRepos: (
    searchKeyWords: string,
    pageSize: number,
    currentPage: number
  ) => Promise<any>;
}

export const searchAPI: IsearchAPI = {
  getRepos(searchKeyWords = "tetris", pageSize, currentPage) {
    return instance.get(
      `search/repositories?q=${searchKeyWords}+in:name&per_page=${pageSize}&page=${currentPage}`
    );
  },
};

interface IrepoAPI {
  getRepoByFullName: (fullName: string) => Promise<any>;

  getRepoInfo: (url: string) => Promise<any>;
}

export const repoAPI: IrepoAPI = {
  getRepoByFullName(fullName) {
    return instance.get(`repos/${fullName}`, {
      headers: {
        Authorization: `token ${my_token}`,
      },
    });
  },

  getRepoInfo(url) {
    return axios.get(url, {
      headers: {
        Authorization: `token ${my_token}`,
      },
    });
  },
};
