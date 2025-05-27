import Card from '@/components/card/Card';
import PieCharts from '@/components/chart/PieCharts';
import { TextField } from '@/components/form';
import Progress from '@/components/progress/Progress';
import TableListHome from '@/components/ui/home/TableListHome';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

interface Props {
    // searchTerm: string;
    // setSearchTerm: any;
    // handleSearch: any;
    // params: {
    //     page: number;
    //     perPage: number;
    //     search: string;
    //     active: string;
    // };
    cardTitle: string;
    subCardTitle?: string;
}

const ChartsNutrition = ({
    // searchTerm,
    // setSearchTerm,
    // handleSearch,
    // params,
    cardTitle,
    subCardTitle,
}: Props) => {
    return (
        <Card cardTitle={cardTitle} subCardTitle={subCardTitle}>
            <div className="w-full max-w-full justify-stretch bg-[#ffffff]">
                <div className="grid grid-cols-2 gap-5">
                    <div className="rounded-[12px] border border-primary-dark bg-white p-6">
                        <div>Macronutrient Distribution</div>
                        <div className="mb-6">
                            <PieCharts />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between rounded-[12px] border border-primary-dark bg-white p-6">
                        <div>Daily Target vs. Actual</div>
                        <div className="mb-7 grid grid-cols-1 gap-10">
                            <Progress
                                value={28}
                                style="primary"
                                label="Protein"
                                fullWidth
                            />
                            <Progress
                                value={70}
                                style="accent"
                                label="Fat"
                                fullWidth
                            />
                            <Progress
                                value={72}
                                style="secondary"
                                label="Carbohydrates"
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ChartsNutrition;
