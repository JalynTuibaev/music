import axiosApi from "../../axiosApi";

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

export const ADD_TRACK_REQUEST = 'ADD_TRACK_REQUEST';
export const ADD_TRACK_SUCCESS = 'ADD_TRACK_SUCCESS';
export const ADD_TRACK_FAILURE = 'ADD_TRACK_FAILURE';

export const CLEAR_ADD_TRACK_ERROR = 'CLEAR_ADD_TRACK_ERROR';
export const clearAddTrackError = () => ({type: CLEAR_ADD_TRACK_ERROR});


const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, payload: tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, payload: error});

const addTrackRequest = () => ({type: ADD_TRACK_REQUEST});
const addTrackSuccess = () => ({type: ADD_TRACK_SUCCESS});
const addTrackFailure = error => ({type: ADD_TRACK_FAILURE, payload: error});

export const getTracks = id => {
    return async dispatch => {
        try {
            dispatch(getTracksRequest());

            const tracks = await axiosApi(`/tracks?album=${id}`);
            dispatch(getTracksSuccess(tracks.data));
        } catch (e) {
            dispatch(getTracksFailure(e));
        }
    };
};

export const addTrack = (trackData) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            dispatch(addTrackRequest());

            await axiosApi.post('/tracks', trackData, {headers});
            dispatch(addTrackSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addTrackFailure(e.response.data));
            } else {
                dispatch(addTrackFailure({global: 'No internet'}));
            }

            throw e;
        }
    };
};