import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const ADD_TRACK_HISTORY_REQUEST = 'ADD_TRACK_HISTORY_REQUEST';
export const ADD_TRACK_HISTORY_SUCCESS = 'ADD_TRACK_HISTORY_SUCCESS';
export const ADD_TRACK_HISTORY_FAILURE = 'ADD_TRACK_HISTORY_FAILURE';

const addTrackHistoryRequest = () => ({type: ADD_TRACK_HISTORY_REQUEST});
const addTrackHistorySuccess = history => ({type: ADD_TRACK_HISTORY_SUCCESS, payload: history});
const addTrackHistoryFailure = error => ({type: ADD_TRACK_HISTORY_FAILURE, payload: error});

export const addTrackHistory = (id) => {
    return async (dispatch, getState) => {
        dispatch(addTrackHistoryRequest());
        try {
            const headers = {
                'Authorization': getState().users.user,
            };

            const history = await axiosApi.post('/track_history', {track: id}, {headers});

            dispatch(addTrackHistorySuccess(history));

            toast.success('Track added to history', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch (e) {
            dispatch(addTrackHistoryFailure(e));

            toast.error('Login or register to add track to history', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
};