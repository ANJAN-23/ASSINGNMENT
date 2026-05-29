import { useState } from "react";

import Search from "./search.jsx";
import ProfileCard from "./profilecard.jsx";


export default function App() {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <div
      className={
        dark
          ? "bg-black text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <button
        className="p-2 m-4 bg-gray-700 rounded"
        onClick={() => setDark(!dark)}
      >
        Toggle Theme
      </button>

      <h1 className="text-4xl font-bold text-center mt-4">
        GitHub Analyzer
      </h1>

      <Search setUser={setUser} />

      <ProfileCard user={user} />

    </div>
  );
}