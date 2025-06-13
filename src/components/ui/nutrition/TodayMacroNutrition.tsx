import PieCharts from "@/components/chart/PieCharts";
import Progress from "@/components/progress/Progress";
import { UserState } from "@/redux/types";

const ChartTodayNutrition = ({ user } : any) => {
    return (
            <div className="grid grid-cols-2 gap-5">
        <div className="rounded-[12px] border border-primary-dark bg-white p-6">
            <div>Macronutrient Distribution</div>
            <div className="mb-6">
                <PieCharts
                    carbs={user?.list?.data?.totals?.carbs}
                    protein={user?.list?.data?.totals?.protein}
                    fat={user?.list?.data?.totals?.fat}
                />
            </div>
        </div>
        <div className="flex flex-col justify-between rounded-[12px] border border-primary-dark bg-white p-6">
            <div>Consumed vs. Daily Target</div>
            <div className="mb-7 grid grid-cols-1 gap-10">
                <Progress
                    current={user?.list?.data?.totals?.protein}
                    target={user?.profile?.data?.proteinTarget}
                    type="nutrient"
                    style="primary"
                    label="Protein"
                    fullWidth
                />
                <Progress
                    current={user?.list?.data?.totals?.fat}
                    target={user?.profile?.data?.fatTarget}
                    type="nutrient"
                    style="accent"
                    label="Fat"
                    fullWidth
                />
                <Progress
                    current={user?.list?.data?.totals?.carbs}
                    target={user?.profile?.data?.carbTarget}
                    type="nutrient"
                    style="secondary"
                    label="Carbohydrates"
                    fullWidth
                />
            </div>
        </div>
    </div>
    );
};

export default ChartTodayNutrition