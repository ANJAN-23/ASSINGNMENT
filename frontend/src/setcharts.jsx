import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '8px 12px',
        borderRadius: 4,
        fontSize: 12,
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--green)'
      }}>
        {payload[0].payload.name}: <strong>{payload[0].value}</strong>
      </div>
    );
  }
  return null;
};

export default function StatsChart({ user }) {
  if (!user) return null;
  const data = user.data;

  const chartData = [
    { name: "Repos", value: Math.min(data.public_repos || 0, 100) },
    { name: "Followers", value: Math.min(data.followers || 0, 100) },
    { name: "Following", value: Math.min(data.following || 0, 100) },
    { name: "Gists", value: Math.min(data.public_gists || 0, 100) },
  ];

  return (
    <div
      className="mx-auto mt-6 fade-in-up"
      style={{ maxWidth: 600, padding: '0 16px' }}
    >
      <div
        className="glow-box rounded-xl p-6"
        style={{ background: 'var(--surface)' }}
      >
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-dim)' }}>
          <span style={{ color: 'var(--green)' }}>◈</span> activity_radar (normalized to 100)
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="rgba(0,255,136,0.15)" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: '#5a8a6a', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              dataKey="value"
              stroke="#00ff88"
              fill="rgba(0,255,136,0.15)"
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
