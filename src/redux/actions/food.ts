import { removeBearer } from "@/helpers/removeBearer";
import { postSharedAuthRefresh } from "@/redux/actions/auth";
import { Dispatch } from "@/redux/types";
import { foodDetail, foodList, foodSearch } from "@/services/foodService";

interface Props {
    data?: any;
    params?: Object;
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

interface PropsSearch {
    data?: any;
    query: string;
    id: number | null;
    callback?: any;
}

export const getFoodList = ({ callback }: Props) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'FOOD_LIST_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await foodList();
        dispatch({
            type: 'FOOD_LIST_SUCCESS',
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
                                getFoodList({ callback })
                            )
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'FOOD_LIST_ERROR',
                    payload: error.response.data,
                })
            }
        }
    }
}
export const getfoodDetail =
    ({ id, callback }: PropsDetail) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'FOOD_DETAIL_LOADING',
            });
            try {
                const { token } = getState().auth;
                const response: any = await foodDetail(id);
                dispatch({
                    type: 'FOOD_DETAIL_SUCCESS',
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
                                    dispatch(getfoodDetail({ id, callback }));
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'FOOD_DETAIL_ERROR',
                            payload: error.response.data,
                        });
                    }
                }
            }
        };
export const getfoodSearch =
    ({ query, id, callback }: PropsSearch) =>
        async (dispatch: Dispatch, getState: any) => {
            dispatch({
                type: 'FOOD_SEARCH_LOADING',
            });
            try {
                const { token } = getState().auth;
                const response: any = await foodSearch(query, id);
                dispatch({
                    type: 'FOOD_SEARCH_SUCCESS',
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
                                    dispatch(getfoodSearch({ query, id, callback }));
                                },
                            })
                        );
                    } else {
                        dispatch({
                            type: 'FOOD_SEARCH_ERROR',
                            payload: error.response.data,
                        });
                    }
                }
            }
        };