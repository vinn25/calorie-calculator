'use client';

import * as Yup from 'yup';

import { Buttons } from '@/components/button';
import { SelectOptions, TextField } from '@/components/form';
import React, { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { postKtpProjectCreate } from '@/redux/actions/project';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingDialog } from '@/components/loading';
import Alert from '@/components/alert/Alert';

const optionProjectType = [
    {
        key: 'selectDepartment',
        text: 'Select Department',
        value: '',
    },
    {
        key: 'QUANTITATIVE',
        text: 'QUANTITATIVE',
        value: 'QUANTITATIVE',
    },
    {
        key: 'QUALITATIVE',
        text: 'QUALITATIVE',
        value: 'QUALITATIVE',
    },
];

const LayoutCreateProject = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const projectState = useSelector((state: any) => state.project);

    const initialSchema = Yup.object().shape({
        projectId: Yup.string().required('Project ID is required'),
        name: Yup.string().required('Project Name is required'),
        department: Yup.string().required('Department is required'),
        study: Yup.string().required('Study is required'),
    });
    const formik = useFormik({
        initialValues: {
            projectId: '',
            name: '',
            department: '',
            study: '',
        },
        validationSchema: initialSchema,
        onSubmit: async values => {
            setLoading(true);
            await dispatch<any>(
                postKtpProjectCreate({
                    data: values,
                    callback: () => {
                        window.location.href = '/project';
                    },
                })
            );
            setLoading(false);
        },
    });
    const { handleSubmit, touched, errors } = formik;
    useEffect(() => {
        if (projectState.actions?.type) {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
                dispatch<any>({
                    type: 'PROJECT_ACTION_CLEAR',
                });
            }, 4000);
        }
    }, [dispatch, projectState.actions?.error, projectState.actions?.type]);

    return (
        <div>
            <LoadingDialog isOpen={loading} />
            <div className="container mx-auto max-w-[698px] border-neutral-100 bg-white p-8">
                <div className="fixed left-1/2 top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                projectState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={
                                projectState?.actions?.type === 'success'
                                    ? `${projectState?.actions?.message?.data}`
                                    : `${projectState?.actions?.error?.meta?.code} : ${projectState?.actions?.error?.meta?.message}`
                            }
                        />
                    )}
                </div>
                <div className="text-neutral mb-6 flex items-start justify-between">
                    <span>
                        <div className="w-full text-title-xs font-semibold">
                            Create New Project
                        </div>
                        <div className="w-full text-text-md font-medium">
                            Complete project information
                        </div>
                    </span>
                </div>
                <FormikProvider value={formik}>
                    <Form noValidate onSubmit={handleSubmit} className="w-full">
                        <div className="mb-3 w-full gap-4">
                            <div>
                                <div className="w-full text-text-sm">
                                    Project Id <sup className="text-red">*</sup>
                                </div>
                                <div>
                                    <TextField
                                        name="projectId"
                                        type="text"
                                        placeholder="Project Id"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        error={Boolean(
                                            touched.projectId &&
                                                errors.projectId
                                        )}
                                        helperText={
                                            touched.projectId &&
                                            errors.projectId
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full text-text-sm">
                                    Project Name{' '}
                                    <sup className="text-red">*</sup>
                                </div>
                                <div>
                                    <TextField
                                        name="name"
                                        type="text"
                                        placeholder="Project Name"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        error={Boolean(
                                            touched.name && errors.name
                                        )}
                                        helperText={touched.name && errors.name}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full text-text-sm">
                                    Department <sup className="text-red">*</sup>
                                </div>
                                <div>
                                    <SelectOptions
                                        name="derpartment"
                                        label=""
                                        options={optionProjectType}
                                        onChange={e => {
                                            formik.setFieldValue(
                                                'department',
                                                e.target.value
                                            );
                                        }}
                                        error={Boolean(
                                            touched.department &&
                                                errors.department
                                        )}
                                        helperText={
                                            touched.department &&
                                            errors.department
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <div className="w-full text-text-sm">
                                        Study <sup className="text-red">*</sup>
                                    </div>
                                    <div>
                                        <TextField
                                            name="study"
                                            type="text"
                                            placeholder="Project Name"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            error={Boolean(
                                                touched.study && errors.study
                                            )}
                                            helperText={
                                                touched.study && errors.study
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="table w-full items-center justify-between rounded-b px-3 pt-5">
                                <div className="table-cell w-[47.5%]">
                                    <Buttons
                                        variant="text"
                                        size="lg"
                                        type="reset"
                                        text="Cancel"
                                        fullWidth
                                        onClick={() => window.history.back()}
                                        color="primary"
                                    />
                                </div>
                                <div className="table-cell w-[5%]" />
                                <div className="table-cell w-[47.5%]">
                                    <Buttons
                                        variant="contained"
                                        size="lg"
                                        type="submit"
                                        text="Save"
                                        fullWidth
                                        // loading={userState?.actions?.loading}
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default LayoutCreateProject;
