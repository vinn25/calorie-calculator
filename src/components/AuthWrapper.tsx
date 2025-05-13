'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { type Reducers } from '@/redux/types';

const AuthWrapper = ({ children }: any) => {
    const authState = useSelector((state: Reducers) => state.auth);
    useEffect(() => {
        if (!authState?.isLogin) {
            redirect('/login');
        }
    }, [authState?.isLogin]);

    return children;
};

export default AuthWrapper;
