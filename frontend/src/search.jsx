import { useState, useRef, useEffect } from "react";
import { fetchUser } from "./api.js";

export default function Search({ setUser, setLoading }) {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setUser(null);
    try {
      const data = await fetchUser(username.trim());
      setUser(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <div className="text-xs tracking-widest mb-1" style={{ color: 'var(--text-dim)' }}>
        <span style={{ color: 'var(--green)' }}>$</span> enter target username
      </div>
      <div className="flex gap-3 items-center">
        <div
          className="relative"
          style={{
            filter: isFocused ? 'drop-shadow(0 0 12px rgba(0,255,136,0.4))' : 'none',
            transition: 'filter 0.3s'
          }}
        >
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: 'var(--green-dim)' }}
          >
            @
          </span>
          <input
            ref={inputRef}
            className="terminal-input pl-8 pr-4 py-3 text-sm w-72 rounded"
            placeholder="torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          onClick={handleSearch}
          className="terminal-btn px-6 py-3 text-sm rounded tracking-widest uppercase"
        >
          Scan
        </button>
      </div>
    </div>
  );
}
