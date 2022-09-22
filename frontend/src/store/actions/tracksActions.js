import axiosApi from "../../axiosApi";

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';



const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, payload: tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, payload: error});

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