import SimpleLineChart from "@/components/chart/SimpleLineChart";
import { Unica_One } from "next/font/google";
import { ResponsiveContainer } from "recharts";

const AggregateMicroNutrition = ({ user }: any) => {
  const daily = user?.list?.data?.daily ?? [];

  return (
    <div className="grid grid-cols-2 gap-5">
      {[
        { label: 'Vitamin C', key: 'vitaminc',color: '#2196F3', unit: 'mg' },
        { label: 'Calcium',  key: 'calcium', color: '#2196F3', unit: 'mg' },
        { label: 'Iron',     key: 'iron',    color: '#2196F3', unit: 'mg' },
        { label: 'Vitamin D', key: 'vitamind', color: '#2196F3', unit: 'μg' },
        { label: 'Potassium', key: 'potassium', color: '#2196F3', unit: 'mg' },
        
      ].map(({ label, key, color, unit }) => (
        <div
          key={key}
          className="w-full rounded-[12px] border border-primary-dark bg-white p-6"
        >
          <div className="mb-4 text-lg font-medium">{label} Trend</div>
          <ResponsiveContainer width="100%" height={300}>
            <SimpleLineChart data={daily} value={key} label={label} color={color} unit={unit} />
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};
 export default AggregateMicroNutrition