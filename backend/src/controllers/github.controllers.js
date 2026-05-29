const GithubUser = require("../models/userinfo.models.js");
const fetchGitHubUser = require("../utils/githubApi.utils.js");

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const cached = await GithubUser.findOne({
      where: { username }
    });

    if (cached) {
      return res.json({
        source: "database",
        data: cached
      });
    }
    const data = await fetchGitHubUser(username);

    const user = await GithubUser.create({
      username: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos
    });

    res.json({
      source: "github_api",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const users = await GithubUser.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching history"
    });
  }
};