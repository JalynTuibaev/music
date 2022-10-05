import axiosApi from "../../axiosApi";

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export const ADD_ARTIST_REQUEST = 'ADD_ARTIST_REQUEST';
export const ADD_ARTIST_SUCCESS = 'ADD_ARTIST_SUCCESS';
export const ADD_ARTIST_FAILURE = 'ADD_ARTIST_FAILURE';

const getArtistsRequest = () => ({type: GET_ARTISTS_REQUEST});
const getArtistsSuccess = artists => ({type: GET_ARTISTS_SUCCESS, payload: artists});
const getArtistsFailure = error => ({type: GET_ARTISTS_FAILURE, payload: error});

const addArtistRequest = () => ({type: ADD_ARTIST_REQUEST});
const addArtistSuccess = () => ({type: ADD_ARTIST_SUCCESS});
const addArtistFailure = error => ({type: ADD_ARTIST_FAILURE, payload: error});

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