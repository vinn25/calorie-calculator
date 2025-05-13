import { Buttons } from '@/components/button';
import DialogForm from '@/components/dialog/DialogForm';
import { SelectOptions, TextField } from '@/components/form';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import React, { useState } from 'react';

const filterTypes = [
    {
        key: 'all',
        text: 'All Department',
        value: '',
    },
    {
        key: 'QUANTITATIVE',
        text: 'QUANTITATIVE',
        value: 'QUANTITATIVE',
    },
    {
        key: 'QUALITATIIVE',
        text: 'QUALITATIIVE',
        value: 'QUALITATIIVE',
    },
];

interface Props {
    params: {
        page: number;
        perPage: number;
        search: string;
        department: string;
    };
    setParams: any;
}

const FilterRespondent = ({ params, setParams }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };
    const [openRespondentList, setOpenRespondentList] = useState(false);
    const handleOpenRespondentList = () => {
        setOpenRespondentList(!openRespondentList);
    };

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
                    {/* <DialogForm
                        title="Respondents"
                        isOpen={openRespondentList}
                        onClose={handleOpenRespondentList}
                    >
                        SelectRespondents
                    </DialogForm> */}
                    {/* <TextField
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
                        // value={searchTerm}
                        contentAfter={
                            <Icon
                                icon="fluent:chevron-down-20-regular"
                                width="20"
                                height="20"
                                onClick={handleOpenRespondentList}
                                className="cursor-pointer"
                            />
                        }
                        onClick={handleOpenRespondentList}
                    /> */}
                </div>
            </div>
            <div />
            <div className="float-right justify-self-end">
                <Link href="./schedule/create">
                    <Buttons
                        text="New Respondent"
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

export default FilterRespondent;
