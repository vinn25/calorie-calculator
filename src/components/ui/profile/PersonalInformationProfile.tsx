import { Buttons } from '@/components/button';
import { SelectOptions, TextField } from '@/components/form';
import { getUserProfile, putUserProfile } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface Props {
    id: number | null;
}

const optionGender = [
    {
        key: 'selectGender',
        text: 'Select Gender',
        value: '',
    },
    {
        key: 'male',
        text: 'Male',
        value: 'male',
    },
    {
        key: 'female',
        text: 'Female',
        value: 'female',
    },
];

const optionActivity = [
    {
        key: 'activity',
        text: 'Activity',
        value: '',
    },
    {
        key: 'sedentary',
        text: 'Sedentary (little or no exercise)',
        value: 'sedentary',
    },
    {
        key: 'light',
        text: 'Lightly active (light exercise/sports 1–3 days)',
        value: 'light',
    },
    {
        key: 'moderate',
        text: 'Moderately active (moderate exercise 3–5 days)',
        value: 'moderate',
    },
    {
        key: 'active',
        text: 'Very active (hard exercise 6–7 days/week)',
        value: 'active',
    },
    {
        key: 'veryactive',
        text: 'Extra active (very hard exercise + physical job)',
        value: 'veryactive',
    },
];

const PersonalInformationProfile = ({ id }: Props) => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    // const authState = useSelector((state: Reducers) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    // const id = authState.profile?.data?.userId
    //     ? authState.profile?.data?.userId
    //     : null;
    useEffect(() => {
        async function getProfile() {
            await dispatch<any>(getUserProfile({ id: id }));
        }
        getProfile();
    }, [dispatch, id]);
    const ProfileSchema = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format')
            .required('Email is required'),
        // password: Yup.string().required('Password is required'),
        height: Yup.number().required('Height is required'),
        weight: Yup.number().required('Weight is required'),
        age: Yup.number().required('Age is required'),
        gender: Yup.string().required('Gender is required'),
        activity: Yup.string().required('Activity is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: userState?.profile?.data?.email,
            // password: '',
            height: userState?.profile?.data?.height,
            weight: userState?.profile?.data?.weight,
            age: userState?.profile?.data?.age,
            gender: userState?.profile?.data?.gender,
            activity: userState?.profile?.data?.activity,
        },
        validationSchema: ProfileSchema,
        onSubmit: async values => {
            setIsLoading(true);
            await dispatch<any>(
                putUserProfile({
                    data: values,
                    id: id,
                    callback: () => {
                        window.location.href = '/profile';
                    },
                })
            );
            setIsLoading(false);
            console.log(values);
        },
    });
    const { errors, handleSubmit, touched } = formik;
    return (
        <div>
            {/* <div className="text-neutral mb-6 flex items-start justify-between">
                <span>
                    <div className="w-full text-title-xsm font-semibold">
                        Personal Information
                    </div>
                    <div className="w-full text-text-sm font-medium text-neutral-500">
                        Update your personal details and physical measurements.
                    </div>
                </span>
            </div> */}
            <FormikProvider value={formik}>
                <Form noValidate onSubmit={handleSubmit} className="w-full">
                    <div className="mt-5">
                        <TextField
                            name="email"
                            type="email"
                            contentBefore={
                                <Icon
                                    icon="fluent:mail-16-regular"
                                    width={16}
                                    height={16}
                                    color="#7E7E7E"
                                />
                            }
                            fullWidth
                            defaultValue={userState?.profile?.data?.email}
                            placeholder="Enter your updated email"
                            onChange={formik.handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </div>
                    {/* <div className="mt-5">
                        <TextFieldPassword
                            name="password"
                            className="w-full rounded-full border-neutral-200 p-2"
                            placeholder="Enter your password"
                            fullWidth
                            onChange={formik.handleChange}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </div> */}
                    <div className="mt-5 grid grid-cols-2 gap-5">
                        <div className="w-full">
                            <TextField
                                name="height"
                                type="number"
                                contentBefore={
                                    <Icon
                                        icon="fluent:ruler-16-regular"
                                        width={16}
                                        height={16}
                                        color="#7E7E7E"
                                    />
                                }
                                placeholder="Height (cm)"
                                min={1}
                                max={200}
                                fullWidth
                                defaultValue={userState?.profile?.data?.height}
                                onChange={formik.handleChange}
                                error={Boolean(touched.height && errors.height)}
                                helperText={touched.height && errors.height}
                            />
                        </div>
                        <div className="w-full">
                            <TextField
                                name="weight"
                                type="number"
                                contentBefore={
                                    <Icon
                                        icon="fluent:ruler-16-regular"
                                        width={16}
                                        height={16}
                                        color="#7E7E7E"
                                    />
                                }
                                placeholder="Weight (kg)"
                                min={1}
                                max={200}
                                fullWidth
                                defaultValue={userState?.profile?.data?.weight}
                                onChange={formik.handleChange}
                                error={Boolean(touched.weight && errors.weight)}
                                helperText={touched.weight && errors.weight}
                            />
                        </div>
                        <div className="w-full">
                            <TextField
                                name="age"
                                type="number"
                                contentBefore={
                                    <Icon
                                        icon="fluent:ruler-16-regular"
                                        width={16}
                                        height={16}
                                        color="#7E7E7E"
                                    />
                                }
                                placeholder="Age"
                                min={1}
                                max={100}
                                fullWidth
                                defaultValue={userState?.profile?.data?.age}
                                onChange={formik.handleChange}
                                error={Boolean(touched.age && errors.age)}
                                helperText={touched.age && errors.age}
                            />
                        </div>
                        <div className="w-full">
                            <SelectOptions
                                name="gender"
                                label=""
                                options={optionGender}
                                selectSize="md"
                                defaultValue={userState?.profile?.data?.gender}
                                onChange={formik.handleChange}
                                error={Boolean(touched.gender && errors.gender)}
                                helperText={touched.gender && errors.gender}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <SelectOptions
                            name="activity"
                            label=""
                            options={optionActivity}
                            selectSize="md"
                            defaultValue={userState?.profile?.data?.activity}
                            onChange={formik.handleChange}
                            error={Boolean(touched.activity && errors.activity)}
                            helperText={touched.activity && errors.activity}
                            fullWidth
                        />
                    </div>
                    <div className="mt-5 overflow-hidden">
                        {/* <Button
                            appearance="transparent"
                            className="float-right text-text-md font-semibold"
                        >
                            Forgot Password
                        </Button> */}
                    </div>
                    <div className="mt-5">
                        <Buttons
                            type="submit"
                            variant="contained"
                            size="md"
                            text="Save Changes"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                            color="primary"
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default PersonalInformationProfile;
