import { Action, UserState, } from "@/redux/types";

const initialState: UserState = {
    list: {
        loading: false,
        error: '',
        data: '',
    },
    profile: {
        loading: false,
        error: '',
        data: '',
    },
    gap: {
        loading: false,
        error: '',
        data: '',
    },
    favorite: {
        loading: false,
        error: '',
        data: '',
    },
    actions: {
        loading: false,
        error: '',
        type: null,
        message: '',
    }
}

const initialActionProject: Action = {
    type: '',
}

export const userReducers = (
    state = initialState,
    action = initialActionProject
) => {
    switch (action.type) {
        case 'USER_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // profile
        case 'USER_PROFILE_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_PROFILE_LOADING':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_PROFILE_ERROR':
            return {
                ...state,
                profile: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // gap
        case 'USER_GAP_SUCCESS':
            return {
                ...state,
                gap: {
                    ...state.gap,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_GAP_LOADING':
            return {
                ...state,
                gap: {
                    ...state.gap,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_GAP_ERROR':
            return {
                ...state,
                gap: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // favorite
        case 'USER_FAVORITE_SUCCESS':
            return {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_FAVORITE_LOADING':
            return {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_FAVORITE_ERROR':
            return {
                ...state,
                favorite: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'USER_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'USER_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'USER_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'USER_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
}