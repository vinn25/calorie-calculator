import BadgeStatus from '@/components/badge/BadgeStatus';
import { ButtonIcon } from '@/components/button';
import DialogConfirmation from '@/components/dialog/DialogConfirmation';
import {
    deleteKtpProjectDelete,
    getKtpProjectList,
} from '@/redux/actions/project';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const headerTable = [
    'Name',
    'Department',
    'Study',
    'Project ID',
    'Status',
    'Action',
];

interface Props {
    params: {
        page: number;
        perPage: number;
        search: string;
        active: string;
    };
}

const TableListProject = ({ params }: Props) => {
    const dispatch = useDispatch();
    const projectState = useSelector((state: Reducers) => state.project);
    const [getId, setGetId] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDeleteProject = () => {
        setOpenDelete(!openDelete);
    };
    const submitDeleteProject = async () => {
        await dispatch<any>(
            deleteKtpProjectDelete({
                id: getId,
                data: {},
                callback: () => {
                    window.location.href = '/project';
                },
            })
        );
        console.log(getId);
    };

    useEffect(() => {
        async function projectList() {
            await dispatch<any>(
                getKtpProjectList({
                    params: {
                        page: params.page,
                        perPage: params.perPage,
                        search: params.search,
                        active: params.active,
                    },
                })
            );
        }
        projectList();
    }, [dispatch, params]);

    return (
        <div className="max-w-full rounded-lg border border-neutral-100 bg-white">
            <DialogConfirmation
                isOpen={openDelete}
                title="Confirmation"
                textYes="Delete Workspace"
                textNo="Cancel"
                color="primary"
                onConfirm={submitDeleteProject}
                onDecline={handleOpenDeleteProject}
                onClose={handleOpenDeleteProject}
                onClickOutside={handleOpenDeleteProject}
            >
                <div className="flex-row text-center">
                    <Image
                        src=""
                        alt="Image"
                        className="m-auto"
                        width={250}
                        height={100}
                    />
                    <div className="mt-5 text-text-xxl font-semibold">
                        Delete Project
                    </div>
                    <div className="mt-5 flex w-full items-center gap-3 bg-warning-50 px-[18px] py-[10px] text-left text-text-sm">
                        <Icon
                            icon="fluent:info-20-regular"
                            width="20"
                            height="20"
                            className="text-text-xl"
                        />
                        This action cannot be undone. All data associated with
                        this workspace will be permanently removed
                    </div>
                </div>
            </DialogConfirmation>
            <table className="h-fit w-full border-collapse">
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
                </tbody>
            </table>
        </div>
    );
};

export default TableListProject;
