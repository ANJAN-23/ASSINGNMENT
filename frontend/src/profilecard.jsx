import {
  Users,
  UserPlus,
  BookOpen,
  Star,
  GitFork,
  Code,
  TrendingUp,
  Calendar
} from "lucide-react";

export default function ProfileCard({ user }) {
  if (!user) return null;

  const profile = user.data || user;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile.avatar_url}
          alt={profile.username}
          className="w-32 h-32 rounded-full border"
        />

        <div>
          <h2 className="text-3xl font-bold">
            {profile.name || profile.username}
          </h2>

          <p className="text-gray-600">@{profile.username}</p>

          {profile.bio && (
            <p className="mt-2 text-gray-700">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>Followers</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.followers}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <UserPlus size={18} />
            <span>Following</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.following}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>Repositories</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.public_repos}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Star size={18} />
            <span>Total Stars</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.total_stars}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <GitFork size={18} />
            <span>Total Forks</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.total_forks}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Code size={18} />
            <span>Top Language</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.most_used_language}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} />
            <span>Follower Ratio</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.follower_ratio}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} />
            <span>Popularity Score</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.popularity_score}
          </h3>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>Account Age</span>
          </div>
          <h3 className="text-xl font-bold">
            {profile.account_age_days} days
          </h3>
        </div>

      </div>

      <div className="mt-6 text-sm text-gray-500">
        Source: {user.source || "database"}
      </div>
    </div>
  );
}