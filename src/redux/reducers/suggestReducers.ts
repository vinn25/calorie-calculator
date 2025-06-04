import { Action, SuggestState } from "@/redux/types";

const initialState: SuggestState = {
    list: {
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

export const suggestReducers = (
    state = initialState,
    action = initialActionProject
) => {
    switch (action.type) {
        case 'SUGGEST_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'SUGGEST_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'SUGGEST_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'SUGGEST_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'SUGGEST_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'SUGGEST_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'SUGGEST_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
}