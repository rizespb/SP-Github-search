import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com/",
  withcredentials: true,
});

export const searchAPI = {
  getRepos(searchKeyWords = "tetris", pageSize, currentPage) {
    return instance.get(
      `search/repositories?q=${searchKeyWords}+in:name&per_page=${pageSize}&page=${currentPage}`
    );
  },
};

export const repoAPI = {
  getRepoByFullName(fullName) {
    return instance.get(`repos/${fullName}`);
  },

  getRepoInfo(url) {
    return axios.get(url, {
      withcredentials: true,
    });
  },
};
