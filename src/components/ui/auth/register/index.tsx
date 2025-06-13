import React, { useEffect } from 'react';

import { Buttons } from '@/components/button';
import { SelectOptions, TextField, TextFieldPassword } from '@/components/form';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import * as Yup from 'yup';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@/components/alert/Alert';
//actions
import { postAuthLoginUser, postAuthRegisterUser } from '@/redux/actions/auth';
import { Reducers } from '@/redux/types';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const selectGender = [
    {
        key: 'Gender',
        text: 'Gender',
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

const selectActivity = [
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

const RegisterLayout = () => {
    const dispatch = useDispatch();
    const authRegisterState = useSelector((state: Reducers) => state.register);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authRegisterState?.actions?.error) {
            setTimeout(() => {
                dispatch({
                    type: 'AUTH_ACTION_CLEAR',
                });
            }, 401);
        }
        if (authRegisterState.isRegister) {
            redirect('/login');
        }
    }, [
        authRegisterState?.actions?.error,
        authRegisterState.isRegister,
        dispatch,
    ]);

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
        height: Yup.number().required('Height is required'),
        weight: Yup.number().required('Weight is required'),
        age: Yup.number().required('Age is required'),
        gender: Yup.string().required('Gender is required'),
        activity: Yup.string().required('Activity is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            height: '',
            weight: '',
            age: '',
            gender: '',
            activity: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async values => {
            setIsLoading(true);
            await dispatch<any>(
                postAuthRegisterUser({
                    data: values,
                })
            );
            setIsLoading(false);
            // console.log(values);
        },
    });
    const { errors, handleSubmit, touched } = formik;
    return (
        <div className="flex max-h-screen min-h-screen min-w-full max-w-full flex-col items-center justify-center bg-primary font-Montserrat">
            {authRegisterState?.actions?.error && (
                <div className="fixed top-5">
                    <Alert
                        type="error"
                        text={`${authRegisterState?.actions?.error?.meta?.code} : ${authRegisterState?.actions?.error?.meta?.message}`}
                    />
                </div>
            )}
            <div className="w-full max-w-[483px] rounded-2xl bg-white px-[32px] py-[42px] text-center shadow">
                {/* <div className="flex items-center justify-center">
                    <Image src={LogoImage} alt="Logo" width={180} />
                </div> */}
                <div className="mt-5">
                    <h1 className="text-title-sm font-semibold text-black">
                        NutriTrack
                    </h1>
                    <p className="text-text-lg text-black">
                        Register your account
                    </p>
                </div>
                <FormikProvider value={formik}>
                    <Form noValidate onSubmit={handleSubmit}>
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
                                placeholder="Enter your registered email"
                                onChange={formik.handleChange}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </div>
                        <div className="mt-5">
                            <TextFieldPassword
                                name="password"
                                className="w-full rounded-full border-neutral-200 p-2"
                                placeholder="Enter your password"
                                fullWidth
                                onChange={formik.handleChange}
                                error={Boolean(
                                    touched.password && errors.password
                                )}
                                helperText={touched.password && errors.password}
                            />
                        </div>
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
                                    value={formik.values.height}
                                    placeholder="Height (cm)"
                                    onChange={formik.handleChange}
                                    min={1}
                                    max={200}
                                    fullWidth
                                    error={Boolean(
                                        touched.height && errors.height
                                    )}
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
                                    value={formik.values.weight}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        touched.weight && errors.weight
                                    )}
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
                                    value={formik.values.age}
                                    onChange={formik.handleChange}
                                    error={Boolean(touched.age && errors.age)}
                                    helperText={touched.age && errors.age}
                                />
                            </div>
                            <div className="w-full">
                                <SelectOptions
                                    name="gender"
                                    label=""
                                    options={selectGender}
                                    selectSize="md"
                                    defaultValue={formik.values.gender}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        touched.gender && errors.gender
                                    )}
                                    helperText={touched.gender && errors.gender}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <SelectOptions
                                name="activity"
                                label=""
                                options={selectActivity}
                                selectSize="md"
                                defaultValue={formik.values.activity}
                                onChange={formik.handleChange}
                                error={Boolean(
                                    touched.activity && errors.activity
                                )}
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
                        <div className="flex justify-center px-4 text-text-sm">
                            <span>Already have an account?</span>
                            <div>&nbsp;</div>
                            <Link href="/login">
                                <div className="text-secondary">Login now</div>
                            </Link>
                        </div>
                        <div className="mt-5">
                            <Buttons
                                type="submit"
                                variant="contained"
                                size="md"
                                text="Register"
                                fullWidth
                                loading={isLoading}
                                disabled={isLoading}
                                color="primary"
                            />
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default RegisterLayout;
