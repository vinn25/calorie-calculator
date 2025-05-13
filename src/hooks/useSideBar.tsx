import { useEffect, useState } from 'react';

interface Props {
    type: 'expand' | 'collapse';
}

const useSideBar = ({ type }: Props) => {
    const [sideBar, setSideBar] = useState('expand');

    useEffect(() => {
        setSideBar(type);
    }, [type]);

    return sideBar;
};

export default useSideBar;
