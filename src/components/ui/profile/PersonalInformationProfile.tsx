import { Buttons } from '@/components/button';
import { SelectOptions, TextField } from '@/components/form';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const optionGender = [
    {
        key: 'selectGender',
        text: 'Select Gender',
        value: '',
    },
    {
        key: 'MALE',
        text: 'MALE',
        value: 'MALE',
    },
    {
        key: 'FEMALE',
        text: 'FEMALE',
        value: 'FEMALE',
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
        key: 'lightly',
        text: 'Lightly active (light exercise/sports 1–3 days)',
        value: 'lightly',
    },
    {
        key: 'moderate',
        text: 'Moderately active (moderate exercise 3–5 days)',
        value: 'moderate',
    },
    {
        key: 'very_active',
        text: 'Very active (hard exercise 6–7 days/week)',
        value: 'very_active',
    },
    {
        key: 'extra_active',
        text: 'Extra active (very hard exercise + physical job)',
        value: 'extra_active',
    },
];

const PersonalInformationProfile = () => {
    // const [isLoading, setIsLoading] = useState(false);
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
            email: '',
            // password: '',
            height: '',
            weight: '',
            age: '',
            gender: '',
            activity: '',
        },
        validationSchema: ProfileSchema,
        onSubmit: async values => {
            // setIsLoading(true);
            // await dispatch<any>(
            //     postAuthRegisterUser({
            //         data: values,
            //     })
            // );
            // setIsLoading(false);
            console.log(values);
        },
    });
    const { errors, handleSubmit, touched } = formik;
    return (
        <div className="container mx-auto max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
            <div className="text-neutral mb-6 flex items-start justify-between">
                <span>
                    <div className="w-full text-title-xsm font-semibold">
                        Personal Information
                    </div>
                    <div className="w-full text-text-sm font-medium text-neutral-500">
                        Update your personal details and physical measurements.
                    </div>
                </span>
            </div>
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
                                value={formik.values.height}
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
                                value={formik.values.weight}
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
                                options={optionGender}
                                selectSize="md"
                                defaultValue={formik.values.gender}
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
                            defaultValue={formik.values.activity}
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
                            // loading={isLoading}
                            // disabled={isLoading}
                            color="primary"
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default PersonalInformationProfile;
