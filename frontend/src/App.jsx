import { useState, useEffect } from "react";
import Search from "./search.jsx";
import ProfileCard from "./profilecard.jsx";
import StatsChart from "./setcharts.jsx";

function MatrixRain() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.04,
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-100px',
            left: `${(i / 20) * 100}%`,
            color: '#00ff88',
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
            lineHeight: 1.2,
            animation: `dataStream ${4 + (i % 5)}s linear ${(i * 0.3) % 3}s infinite`,
            whiteSpace: 'nowrap',
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function BootSequence({ onDone }) {
  const lines = [
    "initializing github_analyzer v2.4.1...",
    "loading kernel modules........... OK",
    "establishing api connections..... OK",
    "mounting user filesystem......... OK",
    "system ready.",
  ];
  const [shown, setShown] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setShown(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--bg)', zIndex: 100 }}>
      <div className="text-left" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
        {shown.map((line, i) => (
          <div
            key={i}
            className="mb-1"
            style={{ color: i === shown.length - 1 ? 'var(--green)' : 'var(--text-dim)' }}
          >
            <span style={{ color: 'var(--green)', marginRight: 8 }}>›</span>
            {line}
          </div>
        ))}
        <div style={{ color: 'var(--green)' }} className="cursor mt-2"> </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <div className="scan-line" />
      <MatrixRain />

      <div
        className="relative z-10 min-h-screen pb-20 transition-opacity duration-500"
        style={{ opacity: booted ? 1 : 0 }}
      >
        {/* Header */}
        <header className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>
              github_analyzer
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
            sys_uptime: <span style={{ color: 'var(--green)' }}>online</span>
          </div>
        </header>

        {/* Hero */}
        <div className="text-center pt-16 pb-4 px-4">
          <div
            className="text-5xl sm:text-7xl font-black mb-3 glow-text tracking-tight"
            style={{ fontFamily: 'Orbitron, monospace', color: 'var(--green)' }}
          >
            GH_SCAN
          </div>
          <div className="text-sm tracking-widest" style={{ color: 'var(--text-dim)' }}>
            ── github profile intelligence terminal ──
          </div>
        </div>

        {/* Search */}
        <Search setUser={setUser} setLoading={setLoading} />

        {/* Loading state */}
        {loading && (
          <div className="text-center mt-12" style={{ color: 'var(--text-dim)', fontSize: 13 }}>
            <div className="mb-2">
              <span style={{ color: 'var(--green)' }}>›</span> scanning target
              <span className="cursor"> </span>
            </div>
            <div className="mx-auto mt-3 rounded overflow-hidden" style={{ width: 200, height: 2, background: 'var(--surface2)' }}>
              <div className="load-bar rounded" style={{ animationDuration: '2s' }} />
            </div>
          </div>
        )}

        {/* Profile */}
        {!loading && user && (
          <>
            <ProfileCard user={user} />
            <StatsChart user={user} />
          </>
        )}

        {/* Footer */}
        {!user && !loading && (
          <div className="text-center mt-20 text-xs" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
            ◌ awaiting input
          </div>
        )}
      </div>
    </>
  );
}
