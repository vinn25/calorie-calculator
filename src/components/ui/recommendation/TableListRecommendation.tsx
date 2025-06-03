import { Buttons } from '@/components/button';
import { LoadingSpinner } from '@/components/loading';
import { getFoodList } from '@/redux/actions/food';
import { Reducers } from '@/redux/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TableListRecommendation = () => {
    const dispatch = useDispatch();
    const foodState = useSelector((state: Reducers) => state.food);
    useEffect(() => {
        async function foodList() {
            await dispatch<any>(getFoodList({}));
        }
        foodList();
    }, [dispatch]);

    return (
        <div className="max-h-[300px] overflow-y-auto">
            <ul className="grid grid-cols-3 gap-2">
                {foodState?.search?.loading ? (
                    <li className="flex cursor-pointer items-center justify-center p-3 hover:bg-muted">
                        <LoadingSpinner />
                    </li>
                ) : foodState?.list?.data?.data ? (
                    foodState?.list?.data?.data
                        .filter((data: any) => data.caloricvalue < 600)
                        .map((data: any) => (
                            <li
                                key={data.foodId}
                                className="rounded-md border border-[#cfcfcf] p-4"
                            >
                                <div className="text-text-lg">
                                    {data.foodName}
                                </div>
                                <div className="mt-5 flex justify-between">
                                    <div className="text-text-sm">
                                        {data.caloricvalue} cal
                                    </div>
                                    <div className="text-text-sm">
                                        C: {data.carbohydrates} g
                                    </div>
                                    <div className="text-text-sm">
                                        P: {data.protein} g
                                    </div>
                                    <div className="text-text-sm">
                                        F: {data.fat} g
                                    </div>
                                </div>
                                <div className="mt-5 w-full">
                                    <Buttons
                                        color="primary"
                                        size="sm"
                                        text="Add to food log"
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                    />
                                </div>
                                <p></p>
                            </li>
                        ))
                ) : (
                    <li className="w-full rounded-md border border-[#cfcfcf] p-4">
                        No food
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TableListRecommendation;
