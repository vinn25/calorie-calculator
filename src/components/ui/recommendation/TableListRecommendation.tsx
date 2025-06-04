import { Buttons } from '@/components/button';
import Card from '@/components/card/Card';
import { LoadingSpinner } from '@/components/loading';
import { getFoodList } from '@/redux/actions/food';
import { getSuggestions } from '@/redux/actions/suggest';
import { Reducers } from '@/redux/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TableListRecommendation = () => {
    const dispatch = useDispatch();
    const suggestState = useSelector((state: Reducers) => state.suggest);
    const authState = useSelector((state: Reducers) => state.auth);
    const id = authState.profile?.data?.userId;
    useEffect(() => {
        async function foodList() {
            await dispatch<any>(getFoodList({}));
        }
        foodList();
    }, [dispatch]);
    useEffect(() => {
        async function getSuggestRemaining() {
            await dispatch<any>(getSuggestions({ id }));
        }
        getSuggestRemaining();
    }, [dispatch, id]);

    return (
        <Card
            cardTitle="Personalized Recommendations"
            subCardTitle="Meal Suggestions"
            addOns={
                <div className="text-text-md">
                    {suggestState?.list?.data?.remaining?.calories} calories
                    remaining
                </div>
            }
        >
            <div className="max-h-[300px] overflow-y-auto">
                <ul className="grid grid-cols-3 gap-2">
                    {suggestState?.list?.loading ? (
                        <li className="flex cursor-pointer items-center justify-center rounded-md border border-[#cfcfcf] p-4 hover:bg-muted">
                            <LoadingSpinner />
                        </li>
                    ) : suggestState?.list?.data?.suggestions ? (
                        suggestState?.list?.data?.suggestions.map(
                            (data: any) => (
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
                            )
                        )
                    ) : (
                        <li className="w-full rounded-md border border-[#cfcfcf] p-4">
                            No food
                        </li>
                    )}
                </ul>
            </div>
        </Card>
    );
};

export default TableListRecommendation;
