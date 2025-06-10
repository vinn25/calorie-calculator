import { postSharedAuthRefresh } from "@/redux/actions/auth";
import { Dispatch } from "@/redux/types";
import { suggestRemaining } from "@/services/suggestService";
import { userCreateFoodFavorite, userCreateFoodLog, userDeleteFoodFavorite, userGap, userListLog, userProfile, userProfileUpdate } from "@/services/userService";

interface Props {
    data?: any;
    params?: Object;
    id: number | null;
    callback?: any;
}

export const getSuggestions = ({ id, callback }: Props) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: 'SUGGEST_LIST_LOADING',
    });
    try {
        const { token } = getState().auth;
        const response: any = await suggestRemaining(id);
        dispatch({
            type: 'SUGGEST_LIST_SUCCESS',
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
                                getSuggestions({
                                    id, callback
                                })
                            )
                        }
                    })
                );
            } else {
                dispatch({
                    type: 'SUGGEST_LIST_ERROR',
                    payload: error.response.data,
                })
            }
        }
    }
}