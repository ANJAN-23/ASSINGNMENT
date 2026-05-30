CREATE TABLE GithubUsers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    avatar_url TEXT,
    followers INT,
    following INT,
    public_repos INT,
    total_stars INT,
    total_forks INT,
    most_used_language VARCHAR(255),
    follower_ratio FLOAT,
    popularity_score FLOAT,
    account_age_days INT,
    createdAt DATETIME,
    updatedAt DATETIME
);