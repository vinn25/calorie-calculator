import { TextField } from '@/components/form';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

interface Props {
    searchTerm: string;
    setSearchTerm: any;
    handleSearch: any;
}

const SearchFoodHome = ({ searchTerm, setSearchTerm, handleSearch }: Props) => {
    return (
        <div>
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
    );
};

export default SearchFoodHome;
