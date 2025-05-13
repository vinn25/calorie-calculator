import { Action, ProjectState, } from "@/redux/types";

const initialState: ProjectState = {
    list: {
        loading: false,
        error: '',
        data: '',
    },
    detail: {
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

export const projectReducers = (
    state = initialState,
    action = initialActionProject
) => {
    switch (action.type) {
        case 'PROJECT_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'PROJECT_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'PROJECT_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // detail
        case 'PROJECT_DETAIL_SUCCESS':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'PROJECT_DETAIL_LOADING':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    error: '',
                },
            };
        case 'PROJECT_DETAIL_ERROR':
            return {
                ...state,
                detail: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'PROJECT_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'PROJECT_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'PROJECT_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'PROJECT_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
}