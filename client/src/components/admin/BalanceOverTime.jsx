import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BalanceOverTime = () => {
  const data = [
    { date: "Jul 01", balance: 20000 },
    { date: "Jul 08", balance: 25000 },
    { date: "Jul 15", balance: 30000 },
    { date: "Jul 22", balance: 28000 },
    { date: "Aug 01", balance: 45000 },
    { date: "Aug 10", balance: 47000 },
    { date: "Aug 20", balance: 43000 },
    { date: "Sep 01", balance: 49000 },
    { date: "Sep 10", balance: 51000 },
    { date: "Sep 20", balance: 53000 },
    { date: "Oct 01", balance: 55000 },
    { date: "Oct 15", balance: 60000 },
    { date: "Nov 01", balance: 62000 },
    { date: "Nov 15", balance: 58000 },
    { date: "Dec 01", balance: 65000 },
    { date: "Dec 15", balance: 70000 },
  ];

  return (
    <div className=" mx-auto w-100 m-2 p-3 bg-orange-400/14 rounded-2xl  ">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">📊 Balance Over Time</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fill: "#4b5563", fontSize: 12 }} />
          <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderColor: "#6366f1",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              fontSize: "14px",
            }}
            labelStyle={{ color: "#374151", fontWeight: "bold" }}
            cursor={{ stroke: "#6366f1", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="url(#balanceLineGradient)"
            strokeWidth={3}
            dot={({ cx, cy, payload, index }) => {
              const color =
                payload.balance < 30000
                  ? "#ef4444" // red
                  : payload.balance < 50000
                  ? "#f59e0b" // amber
                  : "#10b981"; // green
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  stroke={color}
                  strokeWidth={2}
                  fill="#fff"
                />
              );
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceOverTime;
