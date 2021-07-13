import * as axios from "axios";

// const instance = axios.create({
//   baseURL: "https://api.github.com/search/repositories",
// });

export const searchAPI = {
  getRepos(searchKeyWords = "tetris", pageSize, currentPage) {
    return axios.get(
      `https://api.github.com/search/repositories?q=${searchKeyWords}+in:name&per_page=${pageSize}&page=${currentPage}`,
      {
        withcredentials: true,
      }
    );
  },
};
