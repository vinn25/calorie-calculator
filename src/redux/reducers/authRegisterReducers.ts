import { type Action, type AuthRegisterState } from '@/redux/types';

const initialState: AuthRegisterState = {
    loading: false,
    isRegister: false,
    isLogin: false,
    token: {
        accessToken: '',
        refreshToken: '',
    },
    error: '',
    profile: {
        loading: false,
        data: null,
        error: '',
    },
    actions: {
        loading: false,
        error: '',
        type: null,
        message: '',
    },
};

const initialActionAuth: Action = {
    type: '',
};

export const authRegisterReducers = (
    state = initialState,
    action = initialActionAuth
) => {
    switch (action.type) {
        case 'REGISTER_ACTION_LOADING':
            return {
                ...state,
                loading: true,
                error: '',
            };

        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                isRegister: true,
            };

        case 'LOGOUT':
            return {
                ...state,
                loading: false,
                isRegister: false,
                token: undefined,
                actions: {
                    loading: false,
                    error: '',
                    type: null,
                    message: '',
                },
                profile: null
            };

        case 'REGISTER_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        // // profile
        // case 'AUTH_PROFILE_SUCCESS':
        //     return {
        //         ...state,
        //         profile: {
        //             ...state.profile,
        //             loading: false,
        //             data: action.payload,
        //         },
        //     };
        // case 'AUTH_PROFILE_LOADING':
        //     return {
        //         ...state,
        //         profile: {
        //             ...state.profile,
        //             loading: true,
        //             error: '',
        //         },
        //     };
        // case 'AUTH_PROFILE_ERROR':
        //     return {
        //         ...state,
        //         profile: {
        //             loading: false,
        //             data: '',
        //             error: action.payload,
        //         },
        //     };

        // //  actions
        // case 'AUTH_ACTION_LOADING':
        //     return {
        //         ...state,
        //         actions: {
        //             ...state.actions,
        //             loading: true,
        //             error: '',
        //             message: '',
        //         },
        //     };
        // case 'AUTH_ACTION_SUCCESS':
        //     return {
        //         ...state,
        //         actions: {
        //             ...state.actions,
        //             loading: false,
        //             type: 'success',
        //             message: action.payload,
        //         },
        //     };
        // case 'AUTH_ACTION_ERROR':
        //     return {
        //         ...state,
        //         actions: {
        //             ...state.actions,
        //             loading: false,
        //             error: action.payload,
        //             type: 'failed',
        //         },
        //     };
        // case 'AUTH_ACTION_CLEAR':
        //     return {
        //         ...state,
        //         actions: initialState.actions,
        //     };

        default:
            return state;
    }
};
