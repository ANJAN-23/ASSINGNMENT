import { useEffect, useState } from "react";

function StatBox({ label, value, delay = 0 }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!value && value !== 0) return;
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) return;
    const duration = 1000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        start = Math.min(start + step, end);
        setDisplayed(start);
        if (start >= end) clearInterval(counter);
      }, 16);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="stat-card rounded p-4 text-center flex-1">
      <div className="text-2xl font-bold" style={{ color: 'var(--green)', fontFamily: 'Orbitron, monospace' }}>
        {displayed.toLocaleString()}
      </div>
      <div className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text-dim)' }}>
        {label}
      </div>
    </div>
  );
}

export default function ProfileCard({ user }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }
  }, [user]);

  if (!user) return null;
  const data = user.data;

  return (
    <div
      className={`mx-auto mt-10 px-4 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ maxWidth: 600 }}
    >
      {/* Load bar */}
      <div className="h-px mb-6 overflow-hidden rounded" style={{ background: 'var(--surface2)' }}>
        <div className="load-bar rounded" />
      </div>

      {/* Status line */}
      <div className="text-xs mb-4 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }} />
        <span>profile_scan.success — source: <span style={{ color: 'var(--green)' }}>{user.source}</span></span>
      </div>

      {/* Main card */}
      <div className="glow-box rounded-xl p-6" style={{ background: 'var(--surface)' }}>
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <div className="avatar-ring flex-shrink-0">
            <img
              src={data.avatar_url}
              alt={data.username}
              className="w-20 h-20 rounded-full block"
              style={{ border: '2px solid var(--green-dim)' }}
            />
          </div>

          <div>
            <div
              className="text-2xl font-bold glow-text"
              style={{ fontFamily: 'Orbitron, monospace', color: 'var(--green)' }}
            >
              {data.username}
            </div>
            {data.name && (
              <div className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>
                {data.name}
              </div>
            )}
            {data.bio && (
              <div className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text)', opacity: 0.7, maxWidth: 320 }}>
                {data.bio}
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-6 stagger">
          <StatBox label="Followers" value={data.followers} delay={100} />
          <StatBox label="Following" value={data.following} delay={200} />
          <StatBox label="Repos" value={data.public_repos} delay={300} />
        </div>

        {/* Info rows */}
        <div className="space-y-2 stagger">
          {data.location && (
            <InfoRow icon="◈" label="location" value={data.location} />
          )}
          {data.company && (
            <InfoRow icon="◎" label="company" value={data.company} />
          )}
          {data.blog && (
            <InfoRow icon="⬡" label="web" value={data.blog} isLink />
          )}
          {data.twitter_username && (
            <InfoRow icon="◉" label="twitter" value={`@${data.twitter_username}`} />
          )}
          <InfoRow
            icon="◌"
            label="joined"
            value={data.created_at ? new Date(data.created_at).getFullYear() : '—'}
          />
        </div>
      </div>

      {/* GitHub link */}
      <div className="mt-4 text-center">
        <a
          href={`https://github.com/${data.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase transition-all duration-200 hover:glow-text"
          style={{ color: 'var(--text-dim)' }}
        >
          ↗ open on github
        </a>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, isLink }) {
  return (
    <div className="flex items-center gap-3 text-xs py-2 px-3 rounded" style={{ background: 'var(--surface2)' }}>
      <span style={{ color: 'var(--green)' }}>{icon}</span>
      <span className="w-16 tracking-wider uppercase" style={{ color: 'var(--text-dim)' }}>{label}</span>
      {isLink ? (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-colors"
          style={{ color: 'var(--green-dim)' }}
        >
          {value}
        </a>
      ) : (
        <span style={{ color: 'var(--text)' }}>{value}</span>
      )}
    </div>
  );
}
