import { Buttons } from '@/components/button';
import Card from '@/components/card/Card';
import { DialogContent } from '@/components/dialog';
import { SelectOptions, TextField } from '@/components/form';
import { LoadingDialog, LoadingSpinner } from '@/components/loading';
import { getFoodList } from '@/redux/actions/food';
import { getSuggestions } from '@/redux/actions/suggest';
import { postUserCreateFoodLog } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface FoodProps {
    foodId: number;
    foodName: string;
    caloricvalue: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    vitaminc: number;
    calcium: number;
    iron: number;
    vitamind: number;
    potassium: number;
}

const mealTypeFilter = [
    {
        key: 'mealType',
        text: 'Meal Type',
        value: '',
    },
    {
        key: 'BREAKFAST',
        text: 'Breakfast',
        value: 'BREAKFAST',
    },
    {
        key: 'LUNCH',
        text: 'Lunch',
        value: 'LUNCH',
    },
    {
        key: 'DINNER',
        text: 'Dinner',
        value: 'DINNER',
    },
    {
        key: 'SNACK',
        text: 'Snack',
        value: 'SNACK',
    },
];

const TableListRecommendation = () => {
    const dispatch = useDispatch();
    const suggestState = useSelector((state: Reducers) => state.suggest);
    const authState = useSelector((state: Reducers) => state.auth);
    const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null);
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    const [portion, setPortion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openFoodLogEntry, setOpenFoodLogEntry] = useState(false);
    const handleOpenFoodLogEntry = () => {
        setOpenFoodLogEntry(!openFoodLogEntry);
    };
    const handleSelectFood = (food: FoodProps) => {
        setSelectedFood(food);
    };
    const calculateAdjustedNutrition = (value: number) => {
        return Math.round(value * portion * 10) / 10;
    };
    useEffect(() => {
        async function foodList() {
            await dispatch<any>(getFoodList({}));
        }
        foodList();
    }, [dispatch]);
    useEffect(() => {
        async function getSuggestRemaining() {
            await dispatch<any>(getSuggestions({ id: id }));
        }
        getSuggestRemaining();
    }, [dispatch, id]);

    const FoodLogSchema = Yup.object().shape({
        mealType: Yup.string().required('Meal Type is required'),
        portionSize: Yup.number().required('Portion Size is required'),
    });
    const formik = useFormik({
        initialValues: {
            mealType: '',
            portionSize: portion,
        },
        validationSchema: FoodLogSchema,
        onSubmit: async values => {
            const payload = {
                userId: id,
                date: new Date().toISOString(),
                mealType: values.mealType,
                notes: '',
                item: {
                    foodId: selectedFood?.foodId,
                    quantity: values.portionSize,
                },
            };
            setLoading(true);
            await dispatch<any>(
                postUserCreateFoodLog({
                    data: payload,
                    id: id,
                    callback: () => {
                        handleOpenFoodLogEntry();
                        window.location.href = '/foodlog';
                    },
                })
            );
            setLoading(false);
            // console.log(payload);
        },
    });
    const { errors, handleSubmit, touched, setFieldValue } = formik;
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
            {selectedFood && (
                <FormikProvider value={formik}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <DialogContent
                            title="Food Log"
                            isOpen={openFoodLogEntry}
                            onClose={handleOpenFoodLogEntry}
                            onClickOutside={handleOpenFoodLogEntry}
                        >
                            <LoadingDialog isOpen={loading} />
                            <div>
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium">
                                            {selectedFood.foodName}
                                        </h3>
                                        {/* <p className="text-sm">
                                            Base:{' '}
                                            <span className="text-secondary">
                                                {selectedFood.portion}
                                            </span>
                                        </p> */}
                                    </div>
                                </div>
                                <div className="mb-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">
                                            Meal Type
                                        </label>
                                        <SelectOptions
                                            name="mealType"
                                            options={mealTypeFilter}
                                            selectSize="md"
                                            onChange={e => {
                                                setFieldValue(
                                                    'mealType',
                                                    e.target.value
                                                );
                                            }}
                                            error={Boolean(
                                                touched.mealType &&
                                                    errors.mealType
                                            )}
                                            helperText={
                                                touched.mealType &&
                                                errors.mealType
                                            }
                                        />
                                    </div>
                                    <div className="w-full max-w-full">
                                        <label className="text-sm font-medium">
                                            Portion Size
                                        </label>
                                        <div className="bg-white">
                                            <TextField
                                                name="portionSize"
                                                type="number"
                                                onChange={e => {
                                                    setPortion(
                                                        parseInt(e.target.value)
                                                    );
                                                    formik.handleChange(e);
                                                }}
                                                error={Boolean(
                                                    touched.portionSize &&
                                                        errors.portionSize
                                                )}
                                                helperText={
                                                    touched.portionSize &&
                                                    errors.portionSize
                                                }
                                                placeholder="0"
                                                min={1}
                                                max={50}
                                                align="center"
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 rounded-md bg-muted/30 p-3">
                                    <h4 className="mb-2 text-sm font-medium">
                                        Nutrition (adjusted for portion)
                                    </h4>
                                    <div className="grid grid-cols-4 gap-2 text-center">
                                        <div>
                                            <p className="font-bold text-secondary">
                                                {calculateAdjustedNutrition(
                                                    selectedFood.caloricvalue
                                                )}
                                            </p>
                                            <p className="text-xs">Calories</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary">
                                                {calculateAdjustedNutrition(
                                                    selectedFood.protein
                                                )}{' '}
                                                g
                                            </p>
                                            <p className="text-xs">Protein</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary">
                                                {calculateAdjustedNutrition(
                                                    selectedFood.carbohydrates
                                                )}
                                                g
                                            </p>
                                            <p className="text-xs">Carbs</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary">
                                                {calculateAdjustedNutrition(
                                                    selectedFood.fat
                                                )}
                                                g
                                            </p>
                                            <p className="text-xs">Fat</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Buttons
                                        icon="fluent:add-16-regular"
                                        iconSize={16}
                                        color="primary"
                                        size="sm"
                                        text="Add to food log"
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </DialogContent>
                    </Form>
                </FormikProvider>
            )}
            <div className="max-h-[300px] overflow-y-auto">
                <ul className="grid grid-cols-2 gap-2">
                    {suggestState?.list?.loading ? (
                        <li className="flex cursor-pointer items-center justify-center rounded-md border border-[#cfcfcf] p-4 hover:bg-muted">
                            <LoadingSpinner />
                        </li>
                    ) : suggestState?.list?.data?.suggestions &&
                      suggestState?.list?.data?.suggestions.length > 0 ? (
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
                                            text="Add food"
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            onClick={() => {
                                                handleOpenFoodLogEntry();
                                                handleSelectFood(data);
                                            }}
                                        />
                                    </div>
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
