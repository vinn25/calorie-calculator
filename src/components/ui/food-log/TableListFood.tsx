import { Buttons } from '@/components/button';
import { DialogContent } from '@/components/dialog';
import { SelectOptions, TextField } from '@/components/form';
import { LoadingDialog, LoadingSpinner } from '@/components/loading';
import { getFoodList, getfoodSearch } from '@/redux/actions/food';
import { postUserCreateFoodLog } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface Props {
    params: any;
}

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

interface LoggedFoodProps extends FoodProps {
    mealType: string;
    portionSize: number;
    timestamp: number;
}

interface FoodLogEntryProps {
    onAddFood?: (food: FoodProps, mealType: string, portion: number) => void;
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

const TableListFood = ({ params }: Props) => {
    const dispatch = useDispatch();
    const foodState = useSelector((state: Reducers) => state.food);
    const authState = useSelector((state: Reducers) => state.auth);
    const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null);
    const [portion, setPortion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openFoodLogEntry, setOpenFoodLogEntry] = useState(false);
    const id = authState.profile?.data?.userId;
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
        async function foodSearch() {
            await dispatch<any>(getfoodSearch({ query: params }));
        }
        foodSearch();
    }, [dispatch, params]);
    const searchResults: FoodProps[] = Array.isArray(
        foodState?.search?.data?.data
    )
        ? foodState?.search?.data?.data
        : [];

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
            console.log(payload);
        },
    });
    const { errors, handleSubmit, touched, setFieldValue } = formik;
    return (
        <div className="max-w-full rounded-lg border border-primary-light bg-white">
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
            <div className="max-h-60 overflow-y-auto rounded-md border border-[#cfcfcf]">
                {foodState?.search?.loading ? (
                    <li className="flex cursor-pointer items-center justify-center p-3 hover:bg-muted">
                        <LoadingSpinner />
                    </li>
                ) : searchResults && searchResults.length > 0 ? (
                    searchResults.map(data => (
                        <li
                            key={data.foodId}
                            className="flex cursor-pointer items-center justify-between p-3 hover:bg-muted"
                            onClick={() => {
                                handleSelectFood(data);
                                handleOpenFoodLogEntry();
                            }}
                        >
                            <div>
                                <p className="font-medium">{data.foodName}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">
                                    <span className="text-secondary">
                                        {data.caloricvalue}
                                    </span>{' '}
                                    kcal
                                </p>
                                <p className="text-xs">
                                    P:{' '}
                                    <span className="text-secondary">
                                        {data.protein}
                                    </span>
                                    g | C:{' '}
                                    <span className="text-secondary">
                                        {data.carbohydrates}
                                    </span>
                                    g | F:{' '}
                                    <span className="text-secondary">
                                        {data.fat}
                                    </span>
                                    g
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="p-4 text-center text-muted-foreground">
                        No foods found. Try a different search term.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableListFood;
