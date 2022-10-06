import axiosApi from "../../axiosApi";

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

export const ADD_TRACK_REQUEST = 'ADD_TRACK_REQUEST';
export const ADD_TRACK_SUCCESS = 'ADD_TRACK_SUCCESS';
export const ADD_TRACK_FAILURE = 'ADD_TRACK_FAILURE';

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

export const PUBLISH_TRACK_REQUEST = 'PUBLISH_TRACK_REQUEST';
export const PUBLISH_TRACK_SUCCESS = 'PUBLISH_TRACK_SUCCESS';
export const PUBLISH_TRACK_FAILURE = 'PUBLISH_TRACK_FAILURE';

export const CLEAR_ADD_TRACK_ERROR = 'CLEAR_ADD_TRACK_ERROR';
export const clearAddTrackError = () => ({type: CLEAR_ADD_TRACK_ERROR});


const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, payload: tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, payload: error});

const addTrackRequest = () => ({type: ADD_TRACK_REQUEST});
const addTrackSuccess = () => ({type: ADD_TRACK_SUCCESS});
const addTrackFailure = error => ({type: ADD_TRACK_FAILURE, payload: error});

const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
const deleteTrackSuccess = id => ({type: DELETE_TRACK_SUCCESS, payload: id});
const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, payload: error});

const publishTrackRequest = () => ({type: PUBLISH_TRACK_REQUEST});
const publishTrackSuccess = id => ({type: PUBLISH_TRACK_SUCCESS, payload: id});
const publishTrackFailure = error => ({type: PUBLISH_TRACK_FAILURE, payload: error});

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

export const deleteTrack = (trackId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;


            dispatch(deleteTrackRequest());
            await axiosApi.delete('/tracks', {
                headers: {
                    Authorization: token
                },
                data: {
                    track: trackId
                }
            });
            dispatch(deleteTrackSuccess(trackId));
        } catch (e) {
            dispatch(deleteTrackFailure(e));
        }
    };
};

export const publishTrack = (trackId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;


            dispatch(publishTrackRequest());
            await axiosApi.post(`/tracks/${trackId}/publish`, trackId, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(publishTrackSuccess(trackId));
        } catch (e) {
            dispatch(publishTrackFailure(e));
        }
    };
};