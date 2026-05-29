import { PieChart, Pie, Cell } from "recharts";

export default function StatsChart({ user }) {
  if (!user) return null;

  const data = [
    { name: "Followers", value: user.data.followers },
    { name: "Repos", value: user.data.public_repos },
  ];

  const COLORS = ["#3b82f6", "#22c55e"];

  return (
    <div className="flex justify-center mt-6">
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}