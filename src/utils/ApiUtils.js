export const BASE_URL = "https://api.github.com/repos/facebook/react/";
export const HEADERS = {
  headers: {
    Authorization: `token ${process.env.REACT_APP_USER_GITHUB_TOKEN}`,
    Accept:
      "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
  },
};
