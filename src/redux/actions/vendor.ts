import { removeBearer } from "@/helpers/removeBearer";
import { postSharedAuthRefresh } from "@/redux/actions/auth";
import { Dispatch } from "@/redux/types";
import { ktpProjectCreate, ktpVendorCreate, ktpVendorList } from "@/services/ktpService";

interface Props {
    data?: any;
    params: Object;
    callback?: any;
}

interface PropsPostData {
    data: any;
    callback?: any;
}

export const getKtpVendorList = ({ params, callback }: Props) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'VENDOR_LIST_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await ktpVendorList(
            removeBearer(token.access_token),
            params
        );
        dispatch({
            type: 'VENDOR_LIST_SUCCESS',
            payload: response,
        });
        if (callback) {
            callback();
        }
    } catch (error: any) {
        if (error && error.response) {
            if (error.response.data.code === 5006) {
                dispatch(
                    postSharedAuthRefresh({
                        callback: () => {
                            dispatch(
                                getKtpVendorList({ params, callback })
                            )
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'VENDOR_LIST_ERROR',
                    payload: error.response.data,
                })
            }
        }
    }
}

export const postKtpVendorCreate = ({ data, callback }: PropsPostData) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'VENDOR_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await ktpVendorCreate(
            removeBearer(token.access_token),
            data
        )
        dispatch({
            type: 'VENDOR_ACTION_SUCCESS',
            payload: {
                data: 'Vendor Successfully Created'
            },
        });
        callback(response.data);
    } catch (error: any) {
        if (error && error.response) {
            if (error.response.data.code === 5006) {
                dispatch(
                    postSharedAuthRefresh({
                        callback: () => {
                            dispatch(
                                postKtpVendorCreate({
                                    data,
                                    callback,
                                })
                            );
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'VENDOR_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        }
    }
}