import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { ChangeEventHandler, useState } from 'react';
import {
    SelectOptions,
    TextField,
    TextFieldPhoneNumber,
} from '@/components/form';
import { Buttons } from '@/components/button';

interface Props {
    setOpenFormIdentity: any;
}

const optionIdentityType = [
    {
        key: 'all',
        text: 'Select Identity Type',
        value: '',
    },
    {
        key: 'KTP',
        text: 'KTP',
        value: 'KTP',
    },
    {
        key: 'SIM',
        text: 'SIM',
        value: 'SIM',
    },
    {
        key: 'KTM',
        text: 'KTM',
        value: 'KTM',
    },
    {
        key: 'KTS',
        text: 'KTS',
        value: 'KTS',
    },
];

const CreateIdentity = ({ setOpenFormIdentity }: Props) => {
    // const [changeIdentityType, setChangeIdentityType] = useState();

    const InitialSchema = Yup.object().shape({
        identityName: Yup.string().required('Identity Name is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        identityType: Yup.string().required('Identity Type is required'),
        identityNumber: Yup.string()
            .required('Identity Number is required')
            .max(18, 'Identity number too long, maximum 18 characters'),
    });
    const formik = useFormik({
        initialValues: {
            identityName: '',
            phoneNumber: '',
            identityType: '',
            identityNumber: '',
        },
        validationSchema: InitialSchema,
        onSubmit: async values => {
            console.log(values);
        },
    });
    const { handleChange, errors, touched, handleSubmit, setFieldValue } =
        formik;

    return (
        <div className="flex">
            <FormikProvider value={formik}>
                <Form noValidate onSubmit={handleSubmit} className="w-full">
                    <div className="mb-5 w-full gap-5">
                        <div className="text-neutral w-full text-text-sm">
                            Name<sup className="text-red">*</sup>
                        </div>
                        <div className="w-full">
                            <TextField
                                name="identityName"
                                type="text"
                                placeholder="Enter Identity Name"
                                onChange={handleChange}
                                error={Boolean(
                                    touched.identityName && errors.identityName
                                )}
                                helperText={
                                    touched.identityName && errors.identityName
                                }
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="my-5 w-full gap-5">
                        <div className="text-neutral w-full text-text-sm">
                            Phone Number<sup className="text-red">*</sup>
                        </div>
                        <div className="w-full">
                            <TextFieldPhoneNumber
                                name="phoneNumber"
                                onChange={handleChange}
                                error={Boolean(
                                    touched.phoneNumber && errors.phoneNumber
                                )}
                                helperText={
                                    touched.phoneNumber && errors.phoneNumber
                                }
                            />
                        </div>
                    </div>
                    <div className="my-5 w-full gap-5">
                        <div className="text-neutral w-full text-text-sm">
                            Type<sup className="text-red">*</sup>
                        </div>
                        <div className="w-full">
                            <SelectOptions
                                name="identityType"
                                options={optionIdentityType}
                                onChange={e => {
                                    setFieldValue(
                                        'identityType',
                                        e.target.value
                                    );
                                    // setChangeIdentityType(e.target.value);
                                    console.log(
                                        'Identity Type',
                                        e.target.value
                                        // 'Selected option:',
                                        // changeIdentityType
                                    );
                                }}
                                error={Boolean(
                                    touched.identityType && errors.identityType
                                )}
                                helperText={
                                    touched.identityType && errors.identityType
                                }
                            />
                        </div>
                    </div>
                    <div className="my-5 w-full gap-5">
                        <div className="text-neutral w-full text-text-sm">
                            Identity Number<sup className="text-red">*</sup>
                        </div>
                        <div className="w-full">
                            <TextField
                                name="identityNumber"
                                type="text"
                                placeholder="Enter Idnetity Number"
                                onChange={handleChange}
                                error={Boolean(
                                    touched.identityNumber &&
                                        errors.identityNumber
                                )}
                                helperText={
                                    touched.identityNumber &&
                                    errors.identityNumber
                                }
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="table w-full items-center justify-between rounded-b border-t border-solid border-neutral-100 px-3 pt-5">
                        <div className="table-cell w-[47.5%]">
                            <Buttons
                                variant="text"
                                size="md"
                                type="reset"
                                text="Cancel"
                                fullWidth
                                onClick={() => setOpenFormIdentity(false)}
                                color="primary"
                            />
                        </div>
                        <div className="table-cell w-[5%]" />
                        <div className="table-cell w-[47.5%]">
                            <Buttons
                                variant="contained"
                                size="md"
                                type="submit"
                                text="Save Identity"
                                fullWidth
                                color="primary"
                            />
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateIdentity;
