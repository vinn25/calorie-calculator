import { removeBearer } from "@/helpers/removeBearer";
import { postSharedAuthRefresh } from "@/redux/actions/auth";
import { Dispatch } from "@/redux/types";
import { ktpProjectCreate, ktpProjectDelete, ktpProjectDetail, ktpProjectList, ktpProjectUpdate } from "@/services/ktpService";

interface Props {
    data?: any;
    params: Object;
    callback?: any;
}

interface PropsPostData {
    data: any;
    callback?: any;
}

interface PropsDetail {
    data?: any;
    id: string;
    callback?: any;
    params?: any;
}

export const getKtpProjectList = ({ params, callback }: Props) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'PROJECT_LIST_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await ktpProjectList(
            removeBearer(token.accessToken),
            params
        );
        dispatch({
            type: 'PROJECT_LIST_SUCCESS',
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
                                getKtpProjectList({ params, callback })
                            )
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'PROJECT_LIST_ERROR',
                    payload: error.response.data,
                })
            }
        }
    }
}

export const getKtpProjectDetail =
    ({ id, callback }: PropsDetail) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'PROJECT_DETAIL_LOADING',
            });
            try {
                const { token } = getState().auth;
                const response: any = await ktpProjectDetail(removeBearer(token.accessToken), id);
                dispatch({
                    type: 'PROJECT_DETAIL_SUCCESS',
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
                                    dispatch(getKtpProjectDetail({ id, callback }));
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'PROJECT_DETAIL_ERROR',
                            payload: error.response.data,
                        });
                    }
                }
            }
        };

export const postKtpProjectCreate = ({ data, callback }: PropsPostData) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'PROJECT_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await ktpProjectCreate(
            removeBearer(token.accessToken),
            data
        )
        dispatch({
            type: 'PROJECT_ACTION_SUCCESS',
            payload: {
                data: 'Project Successfully Created'
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
                                postKtpProjectCreate({
                                    data,
                                    callback,
                                })
                            );
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'PROJECT_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        }
    }
}

export const putKtpProjectUpdate = ({ data, id, callback }: PropsDetail) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'PROJECT_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        await ktpProjectUpdate(removeBearer(token.accessToken), id, data);
        dispatch({
            type: 'PROJECT_ACTION_SUCCESS',
            payload: {
                data: 'Project Successfully Updated'
            },
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
                            dispatch(putKtpProjectUpdate({ data, id, callback }));
                        },
                    })
                );
            } else {
                dispatch({
                    type: 'PROJECT_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        }
    }
};

export const deleteKtpProjectDelete = ({ id, data, callback }: PropsDetail) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'PROJECT_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        await ktpProjectDelete(removeBearer(token.accessToken), id);
        dispatch({
            type: 'PROJECT_ACTION_SUCCESS',
            payload: {
                data: 'Project successfully deleted'
            },
        });
        callback();
    } catch (error: any) {
        if (error && error.response) {
            if (error.response.data.code === 5006) {
                dispatch(
                    postSharedAuthRefresh({
                        callback: () => {
                            dispatch(
                                deleteKtpProjectDelete({
                                    id,
                                    data,
                                    callback,
                                })
                            );
                        },
                    })
                );
            } else {
                dispatch({
                    type: 'PROJECT_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        } else {
            dispatch({
                type: 'PROJECT_ACTION_ERROR',
                payload: {
                    message: error.message,
                    code: error.code,
                },
            });
        }
    }
}