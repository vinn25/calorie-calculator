import React, { useEffect } from 'react';

import { Buttons } from '@/components/button';
import { TextField, TextFieldPassword } from '@/components/form';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import * as Yup from 'yup';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@/components/alert/Alert';
//actions
import { postAuthLoginUser } from '@/redux/actions/auth';
import { Reducers } from '@/redux/types';
import { redirect } from 'next/navigation';

const LoginLayout = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: Reducers) => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authState?.actions?.error) {
            setTimeout(() => {
                dispatch({
                    type: 'AUTH_ACTION_CLEAR',
                });
            }, 401);
        }
        if (authState.isLogin) {
            redirect('/');
        }
    }, [authState?.actions?.error, authState.isLogin, dispatch]);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async values => {
            setIsLoading(true);
            await dispatch<any>(
                postAuthLoginUser({
                    data: values,
                })
            );
            setIsLoading(false);
        },
    });
    const { errors, handleSubmit, touched } = formik;
    return (
        <div className="flex max-h-screen min-h-screen min-w-full max-w-full flex-col items-center justify-center bg-slate-500 font-Montserrat">
            {authState?.actions?.error && (
                <div className="fixed top-5">
                    <Alert
                        type="error"
                        text={`${authState?.actions?.error?.meta?.code} : ${authState?.actions?.error?.meta?.message}`}
                    />
                </div>
            )}
            <div className="w-full max-w-[483px] rounded-2xl bg-white px-[32px] py-[42px] text-center shadow">
                {/* <div className="flex items-center justify-center">
                    <Image src={LogoImage} alt="Logo" width={180} />
                </div> */}
                <div className="mt-5">
                    <h1 className="text-title-sm font-semibold text-black">
                        Login Page
                    </h1>
                    <p className="text-text-lg text-black">
                        Login into your account
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
                                text="Login"
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

export default LoginLayout;
