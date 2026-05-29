import { useState } from "react";
import { fetchUser } from "./api.js";

export default function Search({ setUser }) {
  const [username, setUsername] = useState("");

  const handleSearch = async () => {
    if (!username) return;

    const data = await fetchUser(username);
    setUser(data);
  };

  return (
    <div className="flex gap-2 justify-center mt-6">
      <input
        className="p-2 rounded-lg text-black w-64"
        placeholder="GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}