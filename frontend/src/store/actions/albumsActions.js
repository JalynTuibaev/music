import axiosApi from "../../axiosApi";

export const GET_ARTIST_ALBUMS_REQUEST = 'GET_ARTIST_ALBUMS_REQUEST';
export const GET_ARTIST_ALBUMS_SUCCESS = 'GET_ARTIST_ALBUMS_SUCCESS';
export const GET_ARTIST_ALBUMS_FAILURE = 'GET_ARTIST_ALBUMS_FAILURE';


const getArtistAlbumsRequest = () => ({type: GET_ARTIST_ALBUMS_REQUEST});
const getArtistAlbumsSuccess = albums => ({type: GET_ARTIST_ALBUMS_SUCCESS, payload: albums});
const getArtistAlbumsFailure = error => ({type: GET_ARTIST_ALBUMS_FAILURE, payload: error});

export const getArtistAlbums = id => {
    return async dispatch => {
        try {
            dispatch(getArtistAlbumsRequest());

            const albums = await axiosApi(`/albums?artist=${id}`);
            dispatch(getArtistAlbumsSuccess(albums.data));
        } catch (e) {
            dispatch(getArtistAlbumsFailure(e));
        }
    };
};