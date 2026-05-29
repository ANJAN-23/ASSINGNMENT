export default function ProfileCard({ user }) {
  if (!user) return null;

  const data = user.data;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg mt-6 w-80 mx-auto">
      <img
        src={data.avatar_url}
        className="w-24 h-24 rounded-full mx-auto"
      />

      <h2 className="text-xl font-bold mt-3">{data.username}</h2>
      <p className="text-gray-400">{data.name}</p>

      <div className="flex justify-between mt-4 text-sm">
        <div>
          <p className="font-bold">{data.followers}</p>
          <p>Followers</p>
        </div>

        <div>
          <p className="font-bold">{data.public_repos}</p>
          <p>Repos</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Source: {user.source}
      </p>
    </div>
  );
}