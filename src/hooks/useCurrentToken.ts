import { useSelector } from 'react-redux';

import { type Reducers } from '@/redux/types';

export default function useCurrentToken() {
    const authState = useSelector((state: Reducers) => state.auth);
    return authState.token;
}
