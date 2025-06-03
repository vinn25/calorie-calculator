import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducers } from '@/redux/reducers/authReducers';
import type { Action } from '@/redux/types';
import { projectReducers } from '@/redux/reducers/projectReducers';
import { authRegisterReducers } from '@/redux/reducers/authRegisterReducers';
import { foodReducers } from '@/redux/reducers/foodReducers';
import { userReducers } from '@/redux/reducers/userReducers';

interface PersistProps {
    key: string;
    storage: any;
}

const persistConfig: PersistProps = {
    key: 'internal-workspace',
    storage,
};

const appReducer = combineReducers({
    auth: authReducers,
    register: authRegisterReducers,
    food: foodReducers,
    user: userReducers,
    project: projectReducers,
});

const rootReducer = (state: any, action: Action) => {
    let res = state;
    if (action.type === 'LOGOUT') {
        res = undefined;
    }
    return appReducer(res, action);
};

export default persistReducer(persistConfig, rootReducer);
