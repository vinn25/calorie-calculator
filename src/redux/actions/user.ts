import { postSharedAuthRefresh } from "@/redux/actions/auth";
import { Dispatch } from "@/redux/types";
import { userCreateFoodFavorite, userCreateFoodLog, userDeleteFoodFavorite, userFoodFavorite, userGap, userListLog, userProfile, userProfileUpdate } from "@/services/userService";

interface Props {
    data?: any;
    params?: Object;
    id: number | null;
    range?: string;
    callback?: any;
}

interface PropsPostData {
    data: any;
    id: number | null;
    callback?: any;
}

interface PropsDetail {
    data?: any;
    id: number | null;
    callback?: any;
    params?: any;
}

export const getUserListLog = ({ id, range, callback }: Props) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'USER_LIST_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await userListLog(id, range);
        dispatch({
            type: 'USER_LIST_SUCCESS',
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
                                getUserListLog({ id, range, callback })
                            )
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'USER_LIST_ERROR',
                    payload: error.response.data,
                })
            }
        }
    }
}
export const getUserProfile = ({ id, callback }: Props) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_PROFILE_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response: any = await userProfile(id);
            dispatch({
                type: 'USER_PROFILE_SUCCESS',
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
                                dispatch(getUserProfile({
                                    id,
                                    callback
                                }));
                            },
                        })
                    );
                } else {
                    dispatch({
                        type: 'USER_PROFILE_ERROR',
                        payload: error.response.data,
                    });
                }
            }
        }
    };
export const getUserGap =
    ({ id, callback }: Props) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'USER_GAP_LOADING',
            });
            try {
                const { token } = getState().auth;
                const response: any = await userGap(id);
                dispatch({
                    type: 'USER_GAP_SUCCESS',
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
                                    dispatch(getUserGap({ id, callback }));
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'USER_GAP_ERROR',
                            payload: error.response.data,
                        });
                    }
                }
            }
        };
export const getUserFavorite =
    ({ id, callback }: Props) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'USER_FAVORITE_LOADING',
            });
            try {
                const { token } = getState().auth;
                const response: any = await userFoodFavorite(id);
                dispatch({
                    type: 'USER_FAVORITE_SUCCESS',
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
                                    dispatch(getUserGap({ id, callback }));
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'USER_FAVORITE_ERROR',
                            payload: error.response.data,
                        });
                    }
                }
            }
        };
export const postUserCreateFoodLog = ({ data, id, callback }: PropsPostData) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'USER_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await userCreateFoodLog(id, data)
        dispatch({
            type: 'USER_ACTION_SUCCESS',
            payload: {
                data: 'Food Successfully Logged'
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
                                postUserCreateFoodLog({
                                    id,
                                    data
                                })
                            );
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'USER_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        }
    }
}
export const postUserCreateFoodFavorite = ({ data, id, callback }: PropsPostData) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'USER_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await userCreateFoodFavorite(id, data)
        dispatch({
            type: 'USER_ACTION_SUCCESS',
            payload: {
                data: 'Food Successfully Added to Favorites'
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
                                postUserCreateFoodFavorite({
                                    data,
                                    id
                                })
                            );
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'USER_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        }
    }
}
export const postUserDeleteFoodFavorite = ({ id, data, callback }: PropsDetail) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'USER_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        await userDeleteFoodFavorite(id, data);
        dispatch({
            type: 'USER_ACTION_SUCCESS',
            payload: {
                data: 'Food successfully deleted from favorites'
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
                                postUserDeleteFoodFavorite({
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
                    type: 'USER_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        } else {
            dispatch({
                type: 'USER_ACTION_ERROR',
                payload: {
                    message: error.message,
                    code: error.code,
                },
            });
        }
    }
}
export const putUserProfile = ({ data, id, callback }: PropsPostData) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'USER_ACTION_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await userProfileUpdate(id, data)
        dispatch({
            type: 'USER_ACTION_SUCCESS',
            payload: {
                data: 'Profile Successfully Updated'
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
                                putUserProfile({
                                    data,
                                    id
                                })
                            );
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'USER_ACTION_ERROR',
                    payload: error.response.data,
                });
            }
        }
    }
}