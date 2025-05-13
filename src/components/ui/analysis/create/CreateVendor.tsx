import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { SelectOptions, TextField } from '@/components/form';
import { Buttons } from '@/components/button';
import { LoadingDialog } from '@/components/loading';
import { useDispatch } from 'react-redux';
import { postKtpProjectCreate } from '@/redux/actions/project';
import { postKtpVendorCreate } from '@/redux/actions/vendor';

interface Props {
    setOpenFormVendor: any;
}

const optionVendorType = [
    {
        key: 'selectVendorType',
        text: 'Select Vendor Type',
        value: '',
    },
    {
        key: 'INTERNAL',
        text: 'INTERNAL',
        value: 'INTERNAL',
    },
    {
        key: 'EXTERNAL',
        text: 'EXTERNAL',
        value: 'EXTERNAL',
    },
];

const CreateVendor = ({ setOpenFormVendor }: Props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const InitialSchema = Yup.object().shape({
        name: Yup.string().required('Vendor Name is required'),
        type: Yup.string().required('Vendor Type is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
        },
        validationSchema: InitialSchema,
        onSubmit: async values => {
            // console.log(values);
            setLoading(true);
            await dispatch<any>(
                postKtpVendorCreate({
                    data: values,
                    callback: () => {
                        setOpenFormVendor(false);
                    },
                })
            );
            setLoading(false);
        },
    });
    const { handleChange, errors, touched, handleSubmit, setFieldValue } =
        formik;
    return (
        <div className="flex">
            <LoadingDialog isOpen={loading} />
            <FormikProvider value={formik}>
                <Form noValidate onSubmit={handleSubmit} className="w-full">
                    <div className="mb-5 w-full gap-5">
                        <div className="text-neutral w-full text-text-sm">
                            Name<sup className="text-red">*</sup>
                        </div>
                        <div className="w-full">
                            <TextField
                                name="name"
                                type="text"
                                placeholder="Enter Vendor Name"
                                onChange={handleChange}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="my-5 w-full gap-5">
                        <div className="text-neutral w-full text-text-sm">
                            Type<sup className="text-red">*</sup>
                        </div>
                        <div className="w-full">
                            <SelectOptions
                                name="type"
                                options={optionVendorType}
                                onChange={(e: any) => {
                                    setFieldValue('type', e.target.value);
                                }}
                                error={Boolean(touched.type && errors.type)}
                                helperText={touched.type && errors.type}
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
                                onClick={() => setOpenFormVendor(false)}
                                color="primary"
                            />
                        </div>
                        <div className="table-cell w-[5%]" />
                        <div className="table-cell w-[47.5%]">
                            <Buttons
                                variant="contained"
                                size="md"
                                type="submit"
                                text="Save Vendor"
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

export default CreateVendor;
