import { Action, VendorState, } from "@/redux/types";

const initialState: VendorState = {
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

const initialActionVendor: Action = {
    type: '',
}

export const vendorReducers = (
    state = initialState,
    action = initialActionVendor
) => {
    switch (action.type) {
        case 'VENDOR_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'VENDOR_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'VENDOR_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // detail
        case 'VENDOR_DETAIL_SUCCESS':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'VENDOR_DETAIL_LOADING':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    error: '',
                },
            };
        case 'VENDOR_DETAIL_ERROR':
            return {
                ...state,
                detail: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'VENDOR_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'VENDOR_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'VENDOR_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'VENDOR_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
}