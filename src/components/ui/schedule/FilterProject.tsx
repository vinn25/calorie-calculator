import { Buttons } from '@/components/button';
import { SelectOptions, TextField } from '@/components/form';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// const useBoolean = false;
// const setUseBoolean = !useBoolean;

const filterStatus = [
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
    params: {
        page: number;
        perPage: number;
        search: string;
        active: string;
    };
    setParams: any;
}

const FilterProject = ({ params, setParams }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedQuery = useDebouncedSearch(searchTerm, 500);

    const handleChangeActive = (e: any) => {
        const value = e.target.value;
        setParams({
            ...params,
            active: e.target.value,
        });
        console.log(e.target.value, params.active);
    };

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        setParams({
            ...params,
            search: debouncedQuery,
        });
        // eslint-disable-next-line
    }, [debouncedQuery]);

    return (
        <div className="grid w-full grid-cols-3 gap-4">
            <div>
                <div className="mb-4 max-w-[335px] bg-[#ffffff]">
                    <TextField
                        name="search"
                        type="search"
                        placeholder="Search"
                        contentBefore={
                            <Icon
                                icon="fluent:search-20-regular"
                                width="20"
                                height="20"
                            />
                        }
                        fullWidth
                        value={searchTerm}
                        contentAfter={
                            searchTerm && (
                                <Icon
                                    icon="fluent:dismiss-circle-20-filled"
                                    width="20"
                                    height="20"
                                    className="cursor-pointer"
                                    onClick={() => setSearchTerm('')}
                                />
                            )
                        }
                        onChange={handleSearch}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative mt-auto w-[150px]">
                        <SelectOptions
                            name="active"
                            label=""
                            options={filterStatus}
                            defaultValue={params.active}
                            // onChange={(e: any) =>
                            //     setParams({
                            //         ...params,
                            //         active: e.target.value,
                            //     })
                            // }
                            onChange={handleChangeActive}
                        />
                    </div>
                </div>
            </div>
            <div />
            <div className="float-right justify-self-end">
                <Link href="./analysis/create">
                    <Buttons
                        text="New Project"
                        icon="fluent:add-24-regular"
                        iconSize={24}
                        variant="contained"
                        size="md"
                        type="button"
                        color="primary"
                    />
                </Link>
            </div>
        </div>
    );
};

export default FilterProject;
