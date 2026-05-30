const GithubUser = require("../models/userinfo.models");
const fetchGitHubUser = require("../utils/githubApi.utils");

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const existingUser = await GithubUser.findOne({
      where: { username }
    });

    if (existingUser) {
      return res.json({
        source: "database",
        data: existingUser
      });
    }

    const { user, repos } = await fetchGitHubUser(username);

    let totalStars = 0;
    let totalForks = 0;

    const languageCount = {};

    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      if (repo.language) {
        languageCount[repo.language] =
          (languageCount[repo.language] || 0) + 1;
      }
    });

    let mostUsedLanguage = "N/A";

    if (Object.keys(languageCount).length > 0) {
      mostUsedLanguage = Object.keys(languageCount).reduce((a, b) =>
        languageCount[a] > languageCount[b] ? a : b
      );
    }

    const followerRatio =
      user.following === 0
        ? user.followers
        : Number(
            (user.followers / user.following).toFixed(2)
          );

    const accountAgeDays = Math.floor(
      (Date.now() - new Date(user.created_at)) /
        (1000 * 60 * 60 * 24)
    );

    const popularityScore =
      user.followers * 2 +
      totalStars +
      totalForks;

    const savedUser = await GithubUser.create({
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      total_stars: totalStars,
      total_forks: totalForks,
      most_used_language: mostUsedLanguage,
      follower_ratio: followerRatio,
      popularity_score: popularityScore,
      account_age_days: accountAgeDays
    });

    res.json({
      source: "github_api",
      data: savedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
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