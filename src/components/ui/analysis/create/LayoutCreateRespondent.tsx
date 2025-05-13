'use client';

import * as Yup from 'yup';

import { Buttons } from '@/components/button';
import { SelectOptions, TextField } from '@/components/form';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form, FormikProvider, useFormik } from 'formik';
import DialogForm from '@/components/dialog/DialogForm';
import { Icon } from '@iconify/react/dist/iconify.js';
import CreateIdentity from '@/components/ui/analysis/create/CreateIdentity';
import RadioButtons from '@/components/form/RadioButtons';
import CreateVendor from '@/components/ui/analysis/create/CreateVendor';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '@/redux/types';
import { getKtpVendorList } from '@/redux/actions/vendor';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import { getKtpProjectList } from '@/redux/actions/project';

const optionIdentity = [
    {
        key: 'identity_1',
        value: 'identity_1',
        name: 'identity',
        identityName: 'John Doe',
        phoneNumber: '08123456789',
        identityNumbeer: '367012345678900',
    },
    {
        key: 'identity_2',
        value: 'identity_2',
        name: 'identity',
        identityName: 'Dane Mark',
        phoneNumber: '08123456789',
        identityNumbeer: '367012345678900',
    },
];

const optionProject = [
    {
        key: 'project_1',
        value: 'project_1',
        name: 'project',
        projectName: 'Blossom',
        department: 'QUANTITATIVE',
    },
    {
        key: 'project_2',
        value: 'project_2',
        name: 'project',
        projectName: 'Blossom 2',
        department: 'QUALITATIVE',
    },
];

const optionVendor = [
    {
        key: 'vendorKey_1',
        value: 'vendorValue_1',
        name: 'vendor',
        vendorName: 'Blabla',
        type: 'INTERNAL',
    },
    {
        key: 'vendorKey_2',
        value: 'vendorValue_2',
        name: 'vendor',
        vendorName: 'Blibli',
        type: 'EXTERNAL',
    },
];

const filterVendorType = [
    // {
    //     key: 'all',
    //     text: 'All Type',
    //     value: '',
    // },
    {
        key: 'EXTERNAL',
        text: 'EXTERNAL',
        value: 'EXTERNAL',
    },
    {
        key: 'INTERNAL',
        text: 'INTERNAL',
        value: 'INTERNAL',
    },
];

const filterProjectStatus = [
    // {
    //     key: 'all',
    //     text: 'All Status',
    //     value: null,
    // },
    {
        key: 'ACTIVE',
        text: 'ACTIVE',
        value: 'true',
    },
    {
        key: 'INACTIVE',
        text: 'INACTIVE',
        value: 'false',
    },
];

interface Props {
    page: number;
    perPage: number;
    search: string;
    type?: string;
    active?: string;
}

const LayoutCreateRespondent = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedQuery = useDebouncedSearch(searchTerm, 500);
    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };
    const [vendorParams, setVendorParams] = useState<Props>({
        page: 1,
        perPage: 10,
        search: '',
        type: 'EXTERNAL',
    });
    const [projectParams, setProjectParams] = useState<Props>({
        page: 1,
        perPage: 10,
        search: '',
        active: 'true',
    });
    useEffect(() => {
        setVendorParams({
            ...vendorParams,
            search: debouncedQuery,
        });
        // eslint-disable-next-line
    }, [debouncedQuery]);
    const vendorState = useSelector((state: Reducers) => state.vendor);
    const projectState = useSelector((state: Reducers) => state.project);

    const handleChangeVendorType = (e: any) => {
        const selecteValue = e.target.value;
        setVendorParams({
            ...vendorParams,
            type: selecteValue,
        });
        // console.log(selecteValue);
    };
    const handleChangeProjectStatus = (e: any) => {
        const selectedValue = e.target.value;
        setProjectParams({
            ...vendorParams,
            active: selectedValue,
        });
    };

    useEffect(() => {
        async function vendorList() {
            await dispatch<any>(
                getKtpVendorList({
                    params: {
                        page: vendorParams.page,
                        perPage: vendorParams.perPage,
                        search: vendorParams.search,
                        type: vendorParams.type,
                    },
                })
            );
        }
        vendorList();
    }, [dispatch, vendorParams]);
    useEffect(() => {
        async function projectList() {
            await dispatch<any>(
                getKtpProjectList({
                    params: {
                        page: projectParams.page,
                        perPage: projectParams.perPage,
                        search: projectParams.search,
                        active: projectParams.active,
                    },
                })
            );
        }
        projectList();
    }, [dispatch, projectParams]);

    const [openIdentityList, setOpenIdentityList] = useState(false);
    const handleOpenIdentityList = () => {
        setOpenIdentityList(!openIdentityList);
    };

    const [openProjectList, setOpenProjectList] = useState(false);
    const handleOpenProjectList = () => {
        setOpenProjectList(!openProjectList);
    };

    const [openVendorList, setOpenVendorList] = useState(false);
    const handleOpenVendorList = () => {
        setOpenVendorList(!openVendorList);
    };

    const [openFormIdentity, setOpenFormIdentity] = useState(false);
    const handleOpenFormIdentity = () => {
        setOpenFormIdentity(!openFormIdentity);
    };

    const [openFormVendor, setOpenFormVendor] = useState(false);
    const handleOpenFormVendor = () => {
        setOpenFormVendor(!openFormVendor);
    };

    const initialSchema = Yup.object().shape({
        identity: Yup.string().required('Identity is required'),
        project: Yup.string().required('Project is required'),
        vendor: Yup.string().required('Vendor is required'),
    });
    const formik = useFormik({
        initialValues: {
            identity: '',
            identityName: '',
            project: '',
            projectName: '',
            vendor: '',
            vendorName: '',
            visitDate: moment().toISOString(),
        },
        validationSchema: initialSchema,
        onSubmit: values => {
            console.log(values);
        },
    });
    const {
        handleSubmit,
        handleChange,
        setFieldValue,
        values,
        touched,
        errors,
    } = formik;

    return (
        <div>
            <DialogForm
                title="Add New Identity"
                isOpen={openFormIdentity}
                onClose={handleOpenFormIdentity}
            >
                <CreateIdentity setOpenFormIdentity={setOpenFormIdentity} />
            </DialogForm>
            <DialogForm
                title="Add New Vendor"
                isOpen={openFormVendor}
                onClose={handleOpenFormVendor}
            >
                <CreateVendor setOpenFormVendor={setOpenFormVendor} />
            </DialogForm>
            <div className="container mx-auto max-w-[698px] border-neutral-100 bg-white p-8">
                {/* <div className="fixed left-1/2 top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                userState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={
                                userState?.actions?.type === 'success'
                                    ? `${userState?.actions?.message?.data}`
                                    : `${userState?.actions?.error?.statusCode} : ${userState?.actions?.error?.message}`
                            }
                        />
                    )}
                </div> */}
                <div className="text-neutral mb-6 flex items-start justify-between">
                    <span>
                        <div className="w-full text-title-xs font-semibold">
                            Create New Respondent
                        </div>
                        <div className="w-full text-text-md font-medium">
                            Complete respondent information
                        </div>
                    </span>
                </div>
                <FormikProvider value={formik}>
                    <Form noValidate onSubmit={handleSubmit} className="w-full">
                        <div className="mb-3 w-full gap-4">
                            {/* <DialogForm
                                title="Add New Identity"
                                isOpen={openFormIdentity}
                                onClose={handleOpenFormIdentity}
                            >
                                <CreateIdentity
                                    setOpenFormIdentity={setOpenFormIdentity}
                                />
                            </DialogForm>
                            <DialogForm
                                title="Add New Vendor"
                                isOpen={openFormVendor}
                                onClose={handleOpenFormVendor}
                            >
                                <CreateVendor
                                    setOpenFormVendor={setOpenFormVendor}
                                />
                            </DialogForm> */}
                            <div>
                                <div className="w-full text-text-sm">
                                    Identity <sup className="text-red">*</sup>
                                </div>
                                <div className="flex">
                                    <div className="relative grow">
                                        <TextField
                                            name="projectName"
                                            type="text"
                                            placeholder="Identity Name"
                                            value={values.identityName}
                                            fullWidth
                                            onChange={handleChange}
                                            error={Boolean(
                                                touched.identity &&
                                                    errors.identity
                                            )}
                                            helperText={
                                                touched.identity &&
                                                errors.identity
                                            }
                                            contentAfter={
                                                <Icon
                                                    icon="fluent:chevron-down-20-regular"
                                                    width="20"
                                                    height="20"
                                                    onClick={
                                                        handleOpenIdentityList
                                                    }
                                                    className="cursor-pointer"
                                                />
                                            }
                                            onClick={handleOpenIdentityList}
                                        />
                                        {openIdentityList && (
                                            <div className="absolute z-10 block w-[501px] rounded-lg bg-white px-[18px] py-4 shadow">
                                                <div className="mb-4 w-full">
                                                    <TextField
                                                        name="searchIdentity"
                                                        type="search"
                                                        fullWidth
                                                        className="mb-4 w-full"
                                                        placeholder="search name"
                                                        contentBefore={
                                                            <Icon
                                                                icon="fluent:search-16-regular"
                                                                width="16"
                                                                height="16"
                                                            />
                                                        }
                                                        // onChange={
                                                        //     handleSearchVendor
                                                        // }
                                                    />
                                                </div>
                                                <div className="max-h-75 w-full overflow-auto">
                                                    {optionIdentity.map(
                                                        option => (
                                                            <RadioButtons
                                                                key={option.key}
                                                                value={
                                                                    option.value
                                                                }
                                                                name={
                                                                    option.name
                                                                }
                                                                label={
                                                                    <div className="flex flex-col items-start">
                                                                        <div>
                                                                            {
                                                                                option.identityName
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                option.phoneNumber
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                option.identityNumbeer
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                }
                                                                onClick={(
                                                                    e: any
                                                                ) => {
                                                                    setFieldValue(
                                                                        'identity',
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    setFieldValue(
                                                                        'identityName',
                                                                        option.identityName
                                                                    );
                                                                    handleOpenIdentityList();
                                                                    console.log(
                                                                        values.identity,
                                                                        values.identityName
                                                                    );
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="content-center px-2">
                                        <Buttons
                                            text="Add New"
                                            size="sm"
                                            variant="text"
                                            icon="fluent:add-20-regular"
                                            iconSize={16}
                                            color="primary"
                                            type="button"
                                            onClick={handleOpenFormIdentity}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full text-text-sm">
                                    Project <sup className="text-red">*</sup>
                                </div>
                                <div>
                                    <TextField
                                        name="projectName"
                                        type="text"
                                        placeholder="Project Name"
                                        value={values.projectName}
                                        fullWidth
                                        onChange={handleChange}
                                        error={Boolean(
                                            touched.project && errors.project
                                        )}
                                        helperText={
                                            touched.project && errors.project
                                        }
                                        contentAfter={
                                            <Icon
                                                icon="fluent:chevron-down-20-regular"
                                                width="20"
                                                height="20"
                                                onClick={handleOpenProjectList}
                                                className="cursor-pointer"
                                            />
                                        }
                                        onClick={handleOpenProjectList}
                                    />
                                    {openProjectList && (
                                        <div className="absolute z-10 block w-[634px] rounded-lg bg-white px-[18px] py-4 shadow">
                                            <div className="mb-4 w-full">
                                                <TextField
                                                    name="searchProject"
                                                    type="search"
                                                    fullWidth
                                                    className="mb-4 w-full"
                                                    placeholder="search name"
                                                    contentBefore={
                                                        <Icon
                                                            icon="fluent:search-16-regular"
                                                            width="16"
                                                            height="16"
                                                        />
                                                    }
                                                />
                                            </div>
                                            <div className="mb-4 w-full">
                                                <div className="relative mt-auto w-[150px]">
                                                    <SelectOptions
                                                        name="active"
                                                        label=""
                                                        options={
                                                            filterProjectStatus
                                                        }
                                                        defaultValue={
                                                            projectParams.active
                                                        }
                                                        onChange={
                                                            handleChangeProjectStatus
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-75 w-full overflow-auto">
                                                {projectState?.list?.loading
                                                    ? 'Loadinng'
                                                    : projectState?.list?.data
                                                            ?.data &&
                                                        projectState?.list?.data
                                                            ?.data.length > 0
                                                      ? projectState?.list?.data?.data.map(
                                                            (data: any) => (
                                                                <RadioButtons
                                                                    key={
                                                                        data._id
                                                                    }
                                                                    value={
                                                                        data._id
                                                                    }
                                                                    name="project"
                                                                    label={
                                                                        <div className="flex flex-col items-start">
                                                                            <div>
                                                                                {
                                                                                    data.name
                                                                                }
                                                                            </div>
                                                                            <div>
                                                                                {
                                                                                    data.department
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    onClick={(
                                                                        e: any
                                                                    ) => {
                                                                        setFieldValue(
                                                                            'project',
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                        setFieldValue(
                                                                            'projectName',
                                                                            data.name
                                                                        );
                                                                        handleOpenProjectList();
                                                                        console.log(
                                                                            values.project,
                                                                            values.projectName
                                                                        );
                                                                    }}
                                                                />
                                                            )
                                                        )
                                                      : 'No Data to Display'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <div className="w-full text-text-sm">
                                        Vendor <sup className="text-red">*</sup>
                                    </div>
                                    <div className="flex">
                                        <div className="relative grow">
                                            <TextField
                                                name="projectName"
                                                type="text"
                                                placeholder="Vendor Name"
                                                fullWidth
                                                value={values.vendorName}
                                                onChange={handleChange}
                                                error={Boolean(
                                                    touched.vendor &&
                                                        errors.vendor
                                                )}
                                                helperText={
                                                    touched.vendor &&
                                                    errors.vendor
                                                }
                                                contentAfter={
                                                    <Icon
                                                        icon="fluent:chevron-down-20-regular"
                                                        width="20"
                                                        height="20"
                                                        onClick={
                                                            handleOpenVendorList
                                                        }
                                                        className="cursor-pointer"
                                                    />
                                                }
                                                onClick={handleOpenVendorList}
                                            />
                                            {openVendorList && (
                                                <div className="absolute z-10 block w-[501px] rounded-lg bg-white px-[18px] py-4 shadow">
                                                    <div className="mb-4 w-full">
                                                        <TextField
                                                            name="search"
                                                            type="search"
                                                            fullWidth
                                                            className="mb-4 w-full"
                                                            placeholder="search name"
                                                            contentBefore={
                                                                <Icon
                                                                    icon="fluent:search-16-regular"
                                                                    width="16"
                                                                    height="16"
                                                                />
                                                            }
                                                            value={searchTerm}
                                                            contentAfter={
                                                                searchTerm && (
                                                                    <Icon
                                                                        icon="fluent:dismiss-circle-20-filled"
                                                                        width="20"
                                                                        height="20"
                                                                        className="cursor-pointer"
                                                                        onClick={() =>
                                                                            setSearchTerm(
                                                                                ''
                                                                            )
                                                                        }
                                                                    />
                                                                )
                                                            }
                                                            onChange={
                                                                handleSearch
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mb-4 w-full">
                                                        <div className="relative mt-auto w-[150px]">
                                                            <SelectOptions
                                                                name="type"
                                                                label=""
                                                                options={
                                                                    filterVendorType
                                                                }
                                                                defaultValue={
                                                                    vendorParams.type
                                                                }
                                                                onChange={
                                                                    handleChangeVendorType
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="max-h-75 w-full overflow-auto">
                                                        {vendorState?.list
                                                            ?.loading
                                                            ? 'Loadinng'
                                                            : vendorState?.list
                                                                    ?.data
                                                                    ?.data &&
                                                                vendorState
                                                                    ?.list?.data
                                                                    ?.data
                                                                    .length > 0
                                                              ? vendorState?.list?.data?.data.map(
                                                                    (
                                                                        data: any
                                                                    ) => (
                                                                        <RadioButtons
                                                                            key={
                                                                                data._id
                                                                            }
                                                                            value={
                                                                                data._id
                                                                            }
                                                                            name="vendor"
                                                                            label={
                                                                                <div className="flex flex-col items-start">
                                                                                    <div>
                                                                                        {
                                                                                            data.name
                                                                                        }
                                                                                    </div>
                                                                                    <div>
                                                                                        {
                                                                                            data.type
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                            onClick={(
                                                                                e: any
                                                                            ) => {
                                                                                setFieldValue(
                                                                                    'vendor',
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                                setFieldValue(
                                                                                    'vendorName',
                                                                                    data.name
                                                                                );
                                                                                handleOpenVendorList();
                                                                                console.log(
                                                                                    values.vendor,
                                                                                    values.vendorName
                                                                                );
                                                                            }}
                                                                        />
                                                                    )
                                                                )
                                                              : 'No Data to Display'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="content-center px-2">
                                            <Buttons
                                                text="Add New"
                                                size="sm"
                                                variant="text"
                                                icon="fluent:add-20-regular"
                                                iconSize={16}
                                                color="primary"
                                                type="button"
                                                onClick={handleOpenFormVendor}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <div className="w-full text-text-sm">
                                        Visit Date{' '}
                                        <sup className="text-red">*</sup>
                                    </div>
                                    <div>
                                        <TextField
                                            name="date"
                                            fullWidth
                                            type="date"
                                            defaultValue={moment(
                                                values.visitDate
                                            ).format('YYYY-MM-DD')}
                                            onChange={handleChange}
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

export default LayoutCreateRespondent;
