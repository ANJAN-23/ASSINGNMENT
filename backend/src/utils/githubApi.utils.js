const axios = require("axios");

async function fetchGitHubUser(username) {
  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  return {
    user: userResponse.data,
    repos: reposResponse.data
  };
}

module.exports = fetchGitHubUser;