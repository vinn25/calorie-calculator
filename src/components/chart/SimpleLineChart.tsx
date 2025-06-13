import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Props {
  data: NutritionData[];
  value: string;
  color: string;
  label: string;
  unit?: string;
}

const SimpleLineChart = ({ data, value, label, color, unit = 'g' }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 40
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(val) => `${val} ${unit}`} />
        <Tooltip
          formatter={(val: number) => [`${val} ${unit}`, label]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={value}
          stroke={color}
          name={label}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
