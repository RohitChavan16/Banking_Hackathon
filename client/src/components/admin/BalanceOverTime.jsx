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
    <div className="w-[400px] h-[300px]">
      <h1 className="text-lg font-bold text-center mb-2">Jai Shri Ram</h1>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceOverTime;
