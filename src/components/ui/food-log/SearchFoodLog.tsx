import Card from '@/components/card/Card';
import { TextField } from '@/components/form';
import TableListFood from '@/components/ui/food-log/TableListFood';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import useDebouncedSearch from '@/hooks/useDebounceSearch';

interface Props {
    params: string;
    setParams: any;
}

const SearchFoodLog = ({ params, setParams }: Props) => {
    const searchParams: any = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedQuery = useDebouncedSearch(searchTerm, 500);

    const handleSearch = (event: any) => {
        const search = event.target.value;
        setSearchTerm(search);
        const getParams = new URLSearchParams(searchParams);
        if (search) {
            getParams.set('query', search);
        } else {
            getParams.delete('query');
        }
        replace(`${pathName}?${getParams.toString()}`);
    };
    useEffect(() => {
        setParams(searchTerm);
        // eslint-disable-next-line
    }, [debouncedQuery]);
    return (
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
    );
};

export default SearchFoodLog;
