import { removeBearer } from '@/helpers/removeBearer';
import { type Dispatch } from '@/redux/types';
import { publicLoginUser, publicRegisterUser } from '@/services/publicService';
import {
    sharedAuthChangePass,
    sharedAuthRefresh,
    sharedUserProfile,
    sharedUserUploadPhoto,
} from '@/services/sharedService';

interface Props {
    data?: any;
    callback?: (response?: any) => void;
}

export const postAuthLoginUser =
    ({ data, callback }: Props) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: 'AUTH_ACTION_LOADING',
            });
            try {
                const response: any = await publicLoginUser(data);
                dispatch({
                    type: 'AUTH_SUCCESS',
                    payload: response,
                });
                dispatch({
                    type: 'AUTH_ACTION_SUCCESS',
                    payload: {
                        message: response.message,
                        code: response.code,
                    },
                });
                dispatch({
                    type: 'USER_SUCCESS',
                });
                if (callback) {
                    callback(response.data);
                }
            } catch (error: any) {
                if (error && error.response) {
                    dispatch({
                        type: 'AUTH_ACTION_ERROR',
                        payload: error.response.data,
                    });
                } else {
                    dispatch({
                        type: 'AUTH_ACTION_ERROR',
                        payload: {
                            message: error.message,
                            code: error.code,
                        },
                    });
                }
            }
        };

export const postAuthRegisterUser =
    ({ data, callback }: Props) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: 'REGISTER_ACTION_LOADING',
            });
            try {
                const response: any = await publicRegisterUser(data);
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: response.data,
                });
                dispatch({
                    type: 'REGISTER_ACTION_SUCCESS',
                    payload: {
                        message: response.message,
                        code: response.code,
                    },
                });
                dispatch({
                    type: 'USER_SUCCESS',
                });
                if (callback) {
                    callback(response.data);
                }
            } catch (error: any) {
                if (error && error.response) {
                    dispatch({
                        type: 'AUTH_ACTION_ERROR',
                        payload: error.response.data,
                    });
                } else {
                    dispatch({
                        type: 'AUTH_ACTION_ERROR',
                        payload: {
                            message: error.message,
                            code: error.code,
                        },
                    });
                }
            }
        };

export const postSharedAuthRefresh =
    ({ callback }: Props) =>
        async (dispatch: Dispatch, getState: any) => {
            try {
                const { token } = getState().auth;
                const response: any = await sharedAuthRefresh(removeBearer(token.refershToken));
                dispatch({
                    type: 'AUTH_SUCCESS',
                    payload: response.data,
                });
                if (callback) {
                    callback(response.data);
                }
            } catch (error: any) {
                if (error.response) {
                    dispatch({
                        type: 'LOGOUT',
                    });
                }
            }
        };

export const getAuthUserProfile =
    ({ callback }: Props) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'AUTH_PROFILE_LOADING',
            });
            try {
                const { token } = getState().auth;
                const response: any = await sharedUserProfile(token.accessToken);
                dispatch({
                    type: 'AUTH_PROFILE_SUCCESS',
                    payload: response,
                });
                if (callback) {
                    callback(response.data);
                }
            } catch (error: any) {
                if (error.response) {
                    if (error.response.data.statusCode === 5000) {
                        dispatch(
                            postSharedAuthRefresh({
                                callback: () => {
                                    dispatch(getAuthUserProfile({ callback }));
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'COUNTRY_LIST_ERROR',
                            payload: error.response.data,
                        });
                    }
                } else {
                    dispatch({
                        type: 'COUNTRY_LIST_ERROR',
                        payload: {
                            message: error.message,
                            code: error.code,
                        },
                    });
                }
            }
        };

export const patchAuthChangePass =
    ({ data, callback }: Props) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'AUTH_ACTION_LOADING',
            });
            try {
                const { token } = getState().auth;
                await sharedAuthChangePass(token.accessToken, data);
                dispatch({
                    type: 'AUTH_ACTION_SUCCESS',
                    payload: {
                        data: 'Password updated successfully',
                    },
                });
                if (callback) {
                    callback();
                }
            } catch (error: any) {
                if (error && error.response) {
                    if (error.response.data.statusCode === 5000) {
                        dispatch(
                            postSharedAuthRefresh({
                                callback: () => {
                                    dispatch(
                                        patchAuthChangePass({
                                            data,
                                            callback,
                                        })
                                    );
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'AUTH_ACTION_ERROR',
                            payload: error.response.data,
                        });
                    }
                } else {
                    dispatch({
                        type: 'AUTH_ACTION_ERROR',
                        payload: {
                            message: error.message,
                            code: error.code,
                        },
                    });
                }
            }
        };

// export const putUserUpdateMobileNumber =
//     ({ data, callback }: Props) =>
//         async (dispatch: Dispatch, getState: any) => {
//             dispatch({
//                 type: 'AUTH_ACTION_LOADING',
//             });
//             try {
//                 const { token } = getState().auth;
//                 await userUpdateMobileNumber(token.accessToken, data);
//                 dispatch({
//                     type: 'AUTH_ACTION_SUCCESS',
//                     payload: {
//                         data: 'Profile updated successfully',
//                     },
//                 });
//                 if (callback) {
//                     callback();
//                 }
//             } catch (error: any) {
//                 if (error && error.response) {
//                     if (error.response.data.statusCode === 5000) {
//                         dispatch(
//                             postSharedAuthRefresh({
//                                 callback: () => {
//                                     dispatch(
//                                         putUserUpdateMobileNumber({
//                                             data,
//                                             callback,
//                                         })
//                                     );
//                                 },
//                             })
//                         );
//                     } else {
//                         dispatch({
//                             type: 'AUTH_ACTION_ERROR',
//                             payload: error.response.data,
//                         });
//                     }
//                 } else {
//                     dispatch({
//                         type: 'AUTH_ACTION_ERROR',
//                         payload: {
//                             message: error.message,
//                             code: error.code,
//                         },
//                     });
//                 }
//             }
//         };

export const putSharedUserUploadPhoto =
    ({ data, callback }: Props) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'AUTH_ACTION_LOADING',
            });
            try {
                const { token } = getState().auth;
                await sharedUserUploadPhoto(token.accessToken, data);
                dispatch({
                    type: 'AUTH_ACTION_SUCCESS',
                    payload: {
                        data: 'Profile updated successfully',
                    },
                });
                if (callback) {
                    callback();
                }
            } catch (error: any) {
                if (error && error.response) {
                    if (error.response.data.statusCode === 5000) {
                        dispatch(
                            postSharedAuthRefresh({
                                callback: () => {
                                    dispatch(
                                        putSharedUserUploadPhoto({
                                            data,
                                            callback,
                                        })
                                    );
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'AUTH_ACTION_ERROR',
                            payload: error.response.data,
                        });
                    }
                } else {
                    dispatch({
                        type: 'AUTH_ACTION_ERROR',
                        payload: {
                            message: error.message,
                            code: error.code,
                        },
                    });
                }
            }
        };

export const logoutUser = () => (dispatch: Dispatch) => {
    dispatch({
        type: 'LOGOUT',
    });
};
