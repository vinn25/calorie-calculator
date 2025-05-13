import { SelectOptions, TextField } from '@/components/form';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const filterTypes = [
    {
        key: 'all',
        text: 'All Types',
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

interface Props {
    params: {
        page: number;
        perPage: number;
        search: string;
        type: string;
    };
    setParams: any;
}

const FilterIdentity = ({ params, setParams }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="w-full">
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
                        name="identity-types"
                        label=""
                        options={filterTypes}
                        onChange={(e: any) =>
                            setParams({
                                ...params,
                                type: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterIdentity;
