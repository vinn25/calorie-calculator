'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import SelectOptions from '@/components/form/SelectOptions';

interface Props {
    params: {
        page: number;
        perPage: number;
        search: string;
    };
    setParams?: any;
    totalPage: number;
    total: number;
    loading?: boolean;
}

const optionPagination = [
    {
        key: '10',
        text: '10',
        value: '10',
    },
    {
        key: '25',
        text: '25',
        value: '25',
    },
    {
        key: '50',
        text: '50',
        value: '50',
    },
];

const Pagination = ({
    params,
    setParams,
    totalPage,
    total,
    loading,
}: Props) => {
    const [pagination, setPagination] = useState({
        start: 0,
        end: 0,
    });
    useEffect(() => {
        setPagination({
            start: params.page * params.perPage - (params.perPage - 1),
            end:
                params.page === totalPage
                    ? total
                    : params.page * params.perPage,
        });
    }, [params, totalPage, total]);
    const handleSetPage = (page: number) => {
        setParams({
            ...params,
            page: page !== 0 ? page : params.page,
        });
    };
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center text-text-sm">
                <div className="text-neutral">Rows Per Page</div>
                <div className="ml-2 flex w-16">
                    <SelectOptions
                        options={optionPagination}
                        name="perPage"
                        fullWidth
                        onChange={e => {
                            setParams({
                                ...params,
                                perPage: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="inline-flex h-10 -space-x-px text-text-md">
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(1)}
                    disabled={loading || (params.page === 1 && true)}
                    aria-label="first"
                >
                    <span className="rounded-full p-2 hover:bg-neutral-100">
                        <Icon
                            icon="fluent:arrow-previous-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(params.page - 1)}
                    disabled={loading || (params.page === 1 && true)}
                    aria-label="prev"
                >
                    <span className="rounded-full p-2 hover:bg-neutral-100">
                        <Icon
                            icon="fluent:chevron-left-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
                <div className="flex items-center px-2">
                    {`${pagination.start} - ${pagination.end} of ${total || 0}`}
                </div>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(params.page + 1)}
                    disabled={loading || (params.page === totalPage && true)}
                    aria-label="next"
                >
                    <span className="rounded-full p-2 hover:bg-neutral-100">
                        <Icon
                            icon="fluent:chevron-right-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(totalPage)}
                    disabled={loading || (params.page === totalPage && true)}
                    aria-label="last"
                >
                    <span className="rounded-full p-2 hover:bg-neutral-100">
                        <Icon
                            icon="fluent:arrow-next-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
            </div>
            {/* <nav aria-label="Page navigation example">
                <ul className="inline-flex h-10 -space-x-px text-text-md">
                    <li>
                        <button
                            type="button"
                            className="ms-0 flex h-10 items-center justify-center gap-[8px] rounded-s-lg border border-e-0 border-[#D0D5DD] bg-white px-4 leading-tight hover:bg-neutral-50"
                            onClick={() => handleSetPage(params.page - 1)}
                            disabled={params.page === 1 && true}
                        >
                            <div>
                                <Icon
                                    icon="fluent:arrow-left-20-filled"
                                    width="20"
                                    height="20"
                                />
                            </div>
                            <div>Previous</div>
                        </button>
                    </li>
                    {pagination.map(data => (
                        <li key="data">
                            <button
                                type="button"
                                className={`flex h-10 items-center justify-center border border-[#D0D5DD] px-4 ${data === params.page ? 'bg-neutral-50 font-semibold' : 'bg-white'} leading-tight hover:bg-neutral-50`}
                                onClick={() => handleSetPage(data)}
                            >
                                {data === 0 ? '...' : `${data}`}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            className="flex h-10 items-center justify-center gap-[8px] rounded-e-lg border border-[#D0D5DD] bg-white px-4 leading-tight hover:bg-neutral-50"
                            onClick={() => handleSetPage(params.page + 1)}
                            disabled={
                                params.page ===
                                    userState?.list?.data?._metadata?.pagination
                                        .totalPage && true
                            }
                        >
                            <div>Next</div>
                            <div>
                                <Icon
                                    icon="fluent:arrow-right-20-filled"
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </button>
                    </li>
                </ul>
            </nav> */}
        </div>
    );
};

export default Pagination;
