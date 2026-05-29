const axios = require("axios");

async function fetchGitHubUser(username) {
  const { data } = await axios.get(
    `https://api.github.com/users/${username}`
  );

  return data;
}

module.exports = fetchGitHubUser;