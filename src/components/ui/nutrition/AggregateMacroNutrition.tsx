import SimpleLineChart from "@/components/chart/SimpleLineChart";
import { ResponsiveContainer } from "recharts";

const ChartAggregateNutrition = ({ user }: any) => {
  const daily = user?.list?.data?.daily ?? [];

  const chartItems = [
    { label: 'Calories', key: 'calories', color: '#0088FE', unit: 'kcal' },
    { label: 'Protein',  key: 'protein',  color: '#00C49F', unit: 'g' },
    { label: 'Carb',     key: 'carbs',    color: '#FFBB28', unit: 'g' },
    { label: 'Fat',      key: 'fat',      color: '#FF8042', unit: 'g' },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      {chartItems.map(({ label, key, color, unit }) => (
        <div
          key={key}
          className="w-full rounded-[12px] border border-primary-dark bg-white p-6"
        >
          <div className="mb-4 text-lg font-medium">{label} Trend</div>
          <ResponsiveContainer width="100%" height={300}>
            <SimpleLineChart
              data={daily}
              value={key}
              label={label}
              color={color}
              unit={unit}
            />
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default ChartAggregateNutrition;