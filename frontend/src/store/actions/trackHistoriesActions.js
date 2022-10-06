import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {historyPush} from "./historyActions";

export const ADD_TRACK_HISTORY_REQUEST = 'ADD_TRACK_HISTORY_REQUEST';
export const ADD_TRACK_HISTORY_SUCCESS = 'ADD_TRACK_HISTORY_SUCCESS';
export const ADD_TRACK_HISTORY_FAILURE = 'ADD_TRACK_HISTORY_FAILURE';

export const GET_TRACK_HISTORY_REQUEST = 'GET_TRACK_HISTORY_REQUEST';
export const GET_TRACK_HISTORY_SUCCESS = 'GET_TRACK_HISTORY_SUCCESS';
export const GET_TRACK_HISTORY_FAILURE = 'GET_TRACK_HISTORY_FAILURE';

const addTrackHistoryRequest = () => ({type: ADD_TRACK_HISTORY_REQUEST});
const addTrackHistorySuccess = () => ({type: ADD_TRACK_HISTORY_SUCCESS});
const addTrackHistoryFailure = error => ({type: ADD_TRACK_HISTORY_FAILURE, payload: error});

const getTrackHistoryRequest = () => ({type: GET_TRACK_HISTORY_REQUEST});
const getTrackHistorySuccess = history => ({type: GET_TRACK_HISTORY_SUCCESS, payload: history});
const getTrackHistoryFailure = error => ({type: GET_TRACK_HISTORY_FAILURE, payload: error});

export const addTrackHistory = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user && getState().users.user.token;
            const headers = {'Authorization': token};
            dispatch(addTrackHistoryRequest());
            await axiosApi.post('/track_history', {track: id}, {headers});

            dispatch(addTrackHistorySuccess());

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
            if (e.response.status === 401) {
                toast.error('Login or register to add track to history', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            dispatch(addTrackHistoryFailure(e));
        }
    };
};

export const getTrackHistory = () => {
    return async (dispatch, getState) => {
        dispatch(getTrackHistoryRequest());
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};

            const history = await axiosApi.get('/track_history', {headers});

            dispatch(getTrackHistorySuccess(history.data));
        }catch (e) {
            dispatch(getTrackHistoryFailure(e));

            toast.warn('You need login!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(historyPush('/login'));
        }
    };
};