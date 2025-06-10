import { Action, FoodState, } from "@/redux/types";

const initialState: FoodState = {
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
    search: {
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

export const foodReducers = (
    state = initialState,
    action = initialActionProject
) => {
    switch (action.type) {
        case 'FOOD_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'FOOD_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'FOOD_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // detail
        case 'FOOD_DETAIL_SUCCESS':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'FOOD_DETAIL_LOADING':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    error: '',
                },
            };
        case 'FOOD_DETAIL_ERROR':
            return {
                ...state,
                detail: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // search
        case 'FOOD_SEARCH_SUCCESS':
            return {
                ...state,
                search: {
                    ...state.search,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'FOOD_SEARCH_LOADING':
            return {
                ...state,
                search: {
                    ...state.search,
                    loading: true,
                    error: '',
                },
            };
        case 'FOOD_SEARCH_ERROR':
            return {
                ...state,
                search: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'FOOD_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'FOOD_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'FOOD_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'FOOD_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
}