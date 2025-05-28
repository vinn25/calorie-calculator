import BadgeStatus from '@/components/badge/BadgeStatus';
import { ButtonIcon, Buttons } from '@/components/button';
import { DialogContent } from '@/components/dialog';
import DialogConfirmation from '@/components/dialog/DialogConfirmation';
import { SelectOptions, TextField } from '@/components/form';
import { getFoodList } from '@/redux/actions/food';
import {
    deleteKtpProjectDelete,
    getKtpProjectList,
} from '@/redux/actions/project';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Form, FormikProvider, useFormik } from 'formik';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface Props {
    searchTerm: string;
    setSearchTerm: any;
    params: {
        page: number;
        perPage: number;
        search: string;
        active: string;
    };
}

interface FoodProps {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    portion: string;
}

interface LoggedFoodProps extends FoodProps {
    mealType: string;
    portionSize: number;
    timestamp: number;
}

interface FoodLogEntryProps {
    onAddFood?: (food: FoodProps, mealType: string, portion: number) => void;
}

const headerTable = [
    'Name',
    'Calorie',
    'Fat',
    'Carbohydrate',
    'Protein',
    'Portion',
    'Action',
];

const mockFoodDatabase: FoodProps[] = [
    {
        id: '1',
        name: 'Chicken Breast',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        portion: '100g',
    },
    {
        id: '2',
        name: 'Brown Rice',
        calories: 112,
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        portion: '100g',
    },
    {
        id: '3',
        name: 'Avocado',
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7,
        portion: '100g',
    },
    {
        id: '4',
        name: 'Salmon',
        calories: 208,
        protein: 20,
        carbs: 0,
        fat: 13,
        portion: '100g',
    },
    {
        id: '5',
        name: 'Broccoli',
        calories: 34,
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4,
        portion: '100g',
    },
    {
        id: '6',
        name: 'Greek Yogurt',
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4,
        portion: '100g',
    },
];

const mealTypeFilter = [
    {
        key: 'mealType',
        text: 'Meal Type',
        value: '',
    },
    {
        key: 'breakfast',
        text: 'Breakfast',
        value: 'breakfast',
    },
    {
        key: 'lunch',
        text: 'Lunch',
        value: 'lunch',
    },
    {
        key: 'dinner',
        text: 'Dinner',
        value: 'dinner',
    },
    {
        key: 'snack',
        text: 'Snack',
        value: 'snack',
    },
];

const TableListFood = (
    { params, searchTerm, setSearchTerm }: Props,
    { onAddFood }: FoodLogEntryProps
) => {
    const dispatch = useDispatch();
    const foodState = useSelector((state: Reducers) => state.food);
    const [foodName, setFoodName] = useState<ReactNode>('');
    const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null);
    const [portion, setPortion] = useState(0);
    const [openFoodLogEntry, setOpenFoodLogEntry] = useState(false);
    const handleOpenFoodLogEntry = () => {
        setOpenFoodLogEntry(!openFoodLogEntry);
    };
    const filteredFoods = searchTerm
        ? mockFoodDatabase.filter(food =>
              food.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];
    const handleSelectFood = (food: FoodProps) => {
        setSelectedFood(food);
        setSearchTerm(food.name);
    };
    const calculateAdjustedNutrition = (value: number) => {
        return Math.round(value * portion * 10) / 10;
    };

    useEffect(() => {
        async function foodList() {
            await dispatch<any>(getFoodList({}));
        }
        foodList();
    }, [dispatch, params]);

    const formik = useFormik({
        initialValues: {
            name: foodName,
            calories: selectedFood?.calories,
            protein: selectedFood?.protein,
            carbs: selectedFood?.carbs,
            fat: selectedFood?.fat,
            mealType: '',
            portionSize: portion,
        },
        onSubmit: async values => {
            // setIsLoading(true);
            // await dispatch<any>(
            //     postAuthLoginUser({
            //         data: values,
            //     })
            // );
            // setIsLoading(false);
            console.log(values);
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
                            <div>
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium">
                                            {selectedFood.name}
                                        </h3>
                                        <p className="text-sm">
                                            Base:{' '}
                                            <span className="text-secondary">
                                                {selectedFood.portion}
                                            </span>
                                        </p>
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
                                                    selectedFood.calories
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
                                                    selectedFood.carbs
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
                {/* {filteredFoods.length > 0 ? (
                    <ul>
                        {filteredFoods.map(food => (
                            <li
                                key={food.id}
                                className="flex cursor-pointer items-center justify-between p-3 hover:bg-muted"
                                onClick={() => {
                                    handleSelectFood(food);
                                    handleOpenFoodLogEntry();
                                    setFoodName(food.name);
                                }}
                            >
                                <div>
                                    <p className="font-medium">{food.name}</p>
                                    <p className="text-sm text-secondary">
                                        {food.portion}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        <span className="text-secondary">
                                            {food.calories}
                                        </span>{' '}
                                        kcal
                                    </p>
                                    <p className="text-xs">
                                        P:{' '}
                                        <span className="text-secondary">
                                            {food.protein}
                                        </span>
                                        g | C:{' '}
                                        <span className="text-secondary">
                                            {food.carbs}
                                        </span>
                                        g | F:{' '}
                                        <span className="text-secondary">
                                            {food.fat}
                                        </span>
                                        g
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 text-center text-muted-foreground">
                        No foods found. Try a different search term.
                    </div>
                )} */}
                {
                    // foodState?.list?.loading ? (
                    //     <tr className="border border-neutral-50">
                    //         {headerTable.map(data => (
                    //             <td className="px-[14px]" key={data}>
                    //                 <div
                    //                     role="status"
                    //                     className="max-w-full animate-pulse"
                    //                 >
                    //                     <div className="mb-4 h-2.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-700" />
                    //                 </div>
                    //             </td>
                    //         ))}
                    //     </tr>
                    // ) :
                    foodState.list.data && foodState.list.data.length > 0 ? (
                        foodState.list.data.map((data: any) => (
                            <li
                                key={data.id}
                                className="flex cursor-pointer items-center justify-between p-3 hover:bg-muted"
                                onClick={() => {
                                    handleSelectFood(data);
                                    handleOpenFoodLogEntry();
                                    setFoodName(data.food);
                                }}
                            >
                                <div>
                                    <p className="font-medium">{data.food}</p>
                                    {/* <p className="text-sm text-secondary">
                                        {data.portion}
                                    </p> */}
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        <span className="text-secondary">
                                            {data.caloricValue}
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
                    )
                }
            </div>
            {/* <table className="h-fit w-full border-collapse">
                <thead>
                    <tr className="[&>td]:border [&>td]:border-neutral-100">
                        {headerTable.map(data => (
                            <th
                                scope="col"
                                className="px-[14px] py-5 text-left text-text-md font-semibold text-neutral-800"
                                key={data}
                            >
                                {data}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {projectState?.list?.loading ? (
                        <tr className="border border-neutral-50">
                            {headerTable.map(data => (
                                <td className="px-[14px]" key={data}>
                                    <div
                                        role="status"
                                        className="max-w-full animate-pulse"
                                    >
                                        <div className="mb-4 h-2.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-700" />
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ) : projectState?.list?.data?.data &&
                      projectState?.list?.data?.data.length > 0 ? (
                        projectState?.list?.data?.data.map((data: any) => (
                            <tr
                                key={data._id}
                                className="cursor-pointer text-text-sm font-medium hover:bg-neutral-50 [&>td]:border-y [&>td]:border-neutral-100 [&>td]:px-[14px] [&>td]:py-5"
                            >
                                <td>{data.name}</td>
                                <td>{data.department}</td>
                                <td>{data.study}</td>
                                <td>{data.projectId}</td>
                                <td>
                                    <BadgeStatus isActive={data.isActive} />
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <ButtonIcon
                                            icon={
                                                <Icon
                                                    icon="fluent:edit-16-regular"
                                                    width={20}
                                                    height={20}
                                                />
                                            }
                                            onClick={() => {
                                                window.location.href = `/project/edit/${data._id}`;
                                            }}
                                        />
                                        <ButtonIcon
                                            icon={
                                                <Icon
                                                    icon="fluent:delete-16-regular"
                                                    width={20}
                                                    height={20}
                                                    className="hover:text-danger-500"
                                                />
                                            }
                                            onClick={() => {
                                                setGetId(data._id);
                                                handleOpenDeleteProject();
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={headerTable.length}
                                className="whitespace-nowrap px-6 py-4 text-center"
                            >
                                <div className="relative w-full max-w-full px-5 py-10">
                                    <div className="m-auto w-[633px] text-center">
                                        <div className="my-5 text-text-xxl font-semibold">
                                            No Project Found
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                    {dummyFoodData.map(data => (
                        <tr
                            key={data.id}
                            className="cursor-pointer text-text-sm font-medium hover:bg-neutral-50 [&>td]:border-y [&>td]:border-neutral-100 [&>td]:px-[14px] [&>td]:py-5"
                        >
                            <td>{data.name}</td>
                            <td>{data.calories}</td>
                            <td>{data.fat}</td>
                            <td>{data.carbs}</td>
                            <td>{data.protein}</td>
                            <td>{data.portion}</td>
                            <td>
                                <div className="flex gap-2">
                                    <ButtonIcon
                                        icon={
                                            <Icon
                                                icon="fluent:add-16-regular"
                                                width={20}
                                                height={20}
                                                className="hover:text-primary1-500"
                                            />
                                        }
                                        onClick={() => {
                                            window.location.href = `/project/edit/${data._id}`;
                                        }}
                                    />
                                    <ButtonIcon
                                        icon={
                                            <Icon
                                                icon="fluent:eye-16-regular"
                                                width={20}
                                                height={20}
                                                className="hover:text-primary1-500"
                                            />
                                        }
                                        onClick={() => {
                                            window.location.href = `/project/edit/${data._id}`;
                                        }}
                                    />
                                    <ButtonIcon
                                        icon={
                                            <Icon
                                                icon="fluent:delete-16-regular"
                                                width={20}
                                                height={20}
                                                className="hover:text-danger-500"
                                            />
                                        }
                                        onClick={() => {
                                            setGetId(data._id);
                                            handleOpenDeleteProject();
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default TableListFood;
