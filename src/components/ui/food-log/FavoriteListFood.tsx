import { ButtonIcon, Buttons } from '@/components/button';
import { DialogContent } from '@/components/dialog';
import DialogConfirmation from '@/components/dialog/DialogConfirmation';
import { SelectOptions, TextField } from '@/components/form';
import { LoadingDialog, LoadingSpinner } from '@/components/loading';
import {
    postUserCreateFoodLog,
    postUserDeleteFoodFavorite,
} from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface FavoriteFoodProps {
    foodId: number;
    foodName: string;
    caloricvalue: number;
    fat: number;
    saturatedfats: number;
    monounsaturatedfats: number;
    polyunsaturatedfats: number;
    carbohydrates: number;
    sugars: number;
    protein: number;
    dietaryfiber: number;
    cholesterol: number;
    sodium: number;
    water: number;
    vitamina: number;
    vitaminb1: number;
    vitaminb11: number;
    vitaminb12: number;
    vitaminb2: number;
    vitaminb3: number;
    vitaminb5: number;
    vitaminb6: number;
    vitaminc: number;
    vitamind: number;
    vitamine: number;
    vitamink: number;
    calcium: number;
    copper: number;
    iron: number;
    magnesium: number;
    manganese: number;
    phosphorus: number;
    potassium: number;
    selenium: number;
    zinc: number;
    nutritiondensity: number;
}

interface FavoriteProps {
    id: number;
    userId: number;
    foodId: number;
    quantity: number;
    food: FavoriteFoodProps; // This is the food object
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

const FavoriteListFood = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null);
    const [selectedFavFood, setSelectedFavFood] =
        useState<FavoriteProps | null>(null);
    const [openDelete, setOpenFavorite] = useState(false);
    const [portion, setPortion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openFoodLogEntry, setOpenFoodLogEntry] = useState(false);
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    const handleOpenFoodLogEntry = () => {
        setOpenFoodLogEntry(!openFoodLogEntry);
    };
    const handleSelectFood = (food: FoodProps) => {
        setSelectedFood(food);
    };
    const handleSelectFavFood = (favorite: FavoriteProps) => {
        setSelectedFavFood(favorite);
    };
    const handleOpenDelete = () => {
        setOpenFavorite(!openDelete);
    };
    const calculateAdjustedNutrition = (value: number) => {
        return Math.round(value * portion * 10) / 10;
    };
    const deleteFavorite = async () => {
        const payload = {
            foodId: selectedFavFood?.foodId,
        };
        await dispatch<any>(
            postUserDeleteFoodFavorite({
                id: id,
                data: payload,
                callback: () => {
                    window.location.href = '/foodlog';
                },
            })
        );
    };
    const searchResults: FoodProps[] = Array.isArray(
        userState?.favorite?.data?.favorites
    )
        ? userState?.favorite?.data?.favorites
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
        <div>
            {selectedFavFood && (
                <DialogConfirmation
                    isOpen={openDelete}
                    title="Confirmation"
                    textYes="Delete"
                    textNo="Cancel"
                    color="primary"
                    onConfirm={deleteFavorite}
                    onDecline={handleOpenDelete}
                    onClose={handleOpenDelete}
                    onClickOutside={handleOpenDelete}
                >
                    <div className="flex-row text-center">
                        <div className="mt-5 text-text-xxl font-semibold">
                            {selectedFavFood.food.foodName}
                        </div>
                        <div className="bg-warning-50 mt-5 flex w-full items-center justify-center gap-3 px-[18px] py-[10px] text-left text-text-sm">
                            <Icon
                                icon="fluent:info-20-regular"
                                width="20"
                                height="20"
                                className="text-text-xl"
                            />
                            Do you want to delete this food from favorites?
                        </div>
                    </div>
                </DialogConfirmation>
            )}
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
                                <div className="flex w-full items-center gap-4">
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
            <div className="max-w-full rounded-lg border border-primary-light bg-white">
                <div className="max-h-60 overflow-y-auto rounded-md border border-[#cfcfcf]">
                    {userState?.favorite?.loading ? (
                        <li className="flex cursor-pointer items-center justify-center p-3 hover:bg-muted">
                            <LoadingSpinner />
                        </li>
                    ) : searchResults && searchResults.length > 0 ? (
                        searchResults.map((data: any) => (
                            <li
                                key={data.foodId}
                                className="flex cursor-pointer items-center gap-4 p-3 hover:bg-muted"
                            >
                                <div
                                    className="flex flex-1 cursor-pointer items-center justify-between"
                                    onClick={() => {
                                        handleSelectFood(data.food);
                                        handleOpenFoodLogEntry();
                                    }}
                                >
                                    <div>
                                        <p className="font-medium">
                                            {data.food.foodName}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            <span className="text-secondary">
                                                {data.food.caloricvalue}
                                            </span>{' '}
                                            kcal
                                        </p>
                                        <p className="text-xs">
                                            P:{' '}
                                            <span className="text-secondary">
                                                {data.food.protein}
                                            </span>
                                            g | C:{' '}
                                            <span className="text-secondary">
                                                {data.food.carbohydrates}
                                            </span>
                                            g | F:{' '}
                                            <span className="text-secondary">
                                                {data.food.fat}
                                            </span>
                                            g
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Icon
                                        icon="fluent:heart-24-filled"
                                        width={24}
                                        height={24}
                                        onClick={() => {
                                            handleSelectFavFood(data);
                                            handleOpenDelete();
                                            console.log(
                                                selectedFavFood?.foodId
                                            );
                                        }}
                                        className="text-red hover:text-muted-foreground"
                                    />
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="p-4 text-center text-muted-foreground">
                            No favorites found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoriteListFood;
