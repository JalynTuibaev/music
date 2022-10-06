import axiosApi from "../../axiosApi";

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export const ADD_ARTIST_REQUEST = 'ADD_ARTIST_REQUEST';
export const ADD_ARTIST_SUCCESS = 'ADD_ARTIST_SUCCESS';
export const ADD_ARTIST_FAILURE = 'ADD_ARTIST_FAILURE';

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

export const PUBLISH_ARTIST_REQUEST = 'PUBLISH_ARTIST_REQUEST';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';
export const PUBLISH_ARTIST_FAILURE = 'PUBLISH_ARTIST_FAILURE';

const getArtistsRequest = () => ({type: GET_ARTISTS_REQUEST});
const getArtistsSuccess = artists => ({type: GET_ARTISTS_SUCCESS, payload: artists});
const getArtistsFailure = error => ({type: GET_ARTISTS_FAILURE, payload: error});

const addArtistRequest = () => ({type: ADD_ARTIST_REQUEST});
const addArtistSuccess = () => ({type: ADD_ARTIST_SUCCESS});
const addArtistFailure = error => ({type: ADD_ARTIST_FAILURE, payload: error});

const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
const deleteArtistSuccess = id => ({type: DELETE_ARTIST_SUCCESS, payload: id});
const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, payload: error});

const publishArtistRequest = () => ({type: PUBLISH_ARTIST_REQUEST});
const publishArtistSuccess = id => ({type: PUBLISH_ARTIST_SUCCESS, payload: id});
const publishArtistFailure = error => ({type: PUBLISH_ARTIST_FAILURE, payload: error});

export const CLEAR_ADD_ARTIST_ERROR = 'CLEAR_ADD_ARTIST_ERROR';
export const clearAddArtistError = () => ({type: CLEAR_ADD_ARTIST_ERROR});



export const getArtists = () => {
    return async dispatch => {
        try {
            dispatch(getArtistsRequest());

            const artists = await axiosApi('/artists');
            dispatch(getArtistsSuccess(artists.data));
        } catch (e) {
            dispatch(getArtistsFailure(e));
        }
    };
};

export const addArtist = (artistData) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            dispatch(addArtistRequest());

            await axiosApi.post('/artists', artistData, {headers});
            dispatch(addArtistSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addArtistFailure(e.response.data));
            } else {
                dispatch(addArtistFailure({global: 'No internet'}));
            }

            throw e;
        }
    };
};

export const deleteArtist = (artistId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;


            dispatch(deleteArtistRequest());
            await axiosApi.delete('/artists', {
                headers: {
                    Authorization: token
                },
                data: {
                    artist: artistId
                }
            });
            dispatch(deleteArtistSuccess(artistId));
        } catch (e) {
            dispatch(deleteArtistFailure(e));
        }
    };
};

export const publishArtist = (artistId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;


            dispatch(publishArtistRequest());
            await axiosApi.post(`/artists/${artistId}/publish`, artistId, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(publishArtistSuccess(artistId));
        } catch (e) {
            dispatch(publishArtistFailure(e));
        }
    };
};