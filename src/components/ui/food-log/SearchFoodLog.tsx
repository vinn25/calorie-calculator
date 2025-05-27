import Card from '@/components/card/Card';
import { TextField } from '@/components/form';
import TableListHome from '@/components/ui/home/TableListHome';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

interface Props {
    searchTerm: string;
    setSearchTerm: any;
    handleSearch: any;
    params: {
        page: number;
        perPage: number;
        search: string;
        active: string;
    };
    cardTitle: string;
    subCardTitle?: string;
}

const SearchFoodLog = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    params,
    cardTitle,
    subCardTitle,
}: Props) => {
    return (
        <Card cardTitle={cardTitle} subCardTitle={subCardTitle}>
            <div className="w-full max-w-full justify-stretch bg-[#ffffff]">
                <TextField
                    name="search"
                    type="search"
                    placeholder="Search Food"
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
            <div className="mt-5 min-h-full w-full max-w-full">
                {searchTerm && (
                    <TableListHome
                        params={params}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                )}
            </div>
        </Card>
    );
};

export default SearchFoodLog;
