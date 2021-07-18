import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com/",
  // withCredentials: true,
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
    return instance.get(`repos/${fullName}`);
  },

  getRepoInfo(url) {
    return axios.get(url, {
      // withCredentials: true,
    });
  },
};
