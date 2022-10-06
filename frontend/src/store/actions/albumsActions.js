import axiosApi from "../../axiosApi";

export const GET_ARTIST_ALBUMS_REQUEST = 'GET_ARTIST_ALBUMS_REQUEST';
export const GET_ARTIST_ALBUMS_SUCCESS = 'GET_ARTIST_ALBUMS_SUCCESS';
export const GET_ARTIST_ALBUMS_FAILURE = 'GET_ARTIST_ALBUMS_FAILURE';

export const GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_FAILURE = 'GET_ALBUMS_FAILURE';

export const ADD_ALBUM_REQUEST = 'ADD_ALBUM_REQUEST';
export const ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS';
export const ADD_ALBUM_FAILURE = 'ADD_ALBUM_FAILURE';

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';

export const PUBLISH_ALBUM_REQUEST = 'PUBLISH_ALBUM_REQUEST';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';
export const PUBLISH_ALBUM_FAILURE = 'PUBLISH_ALBUM_FAILURE';

export const CLEAR_ADD_ALBUM_ERROR = 'CLEAR_ADD_ALBUM_ERROR';
export const clearAddAlbumError = () => ({type: CLEAR_ADD_ALBUM_ERROR});


const getArtistAlbumsRequest = () => ({type: GET_ARTIST_ALBUMS_REQUEST});
const getArtistAlbumsSuccess = albums => ({type: GET_ARTIST_ALBUMS_SUCCESS, payload: albums});
const getArtistAlbumsFailure = error => ({type: GET_ARTIST_ALBUMS_FAILURE, payload: error});

const getAlbumsRequest = () => ({type: GET_ALBUMS_REQUEST});
const getAlbumsSuccess = albums => ({type: GET_ALBUMS_SUCCESS, payload: albums});
const getAlbumsFailure = error => ({type: GET_ALBUMS_FAILURE, payload: error});

const addAlbumRequest = () => ({type: ADD_ALBUM_REQUEST});
const addAlbumSuccess = () => ({type: ADD_ALBUM_SUCCESS});
const addAlbumFailure = error => ({type: ADD_ALBUM_FAILURE, payload: error});

const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
const deleteAlbumSuccess = id => ({type: DELETE_ALBUM_SUCCESS, payload: id});
const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, payload: error});

const publishAlbumRequest = () => ({type: PUBLISH_ALBUM_REQUEST});
const publishAlbumSuccess = id => ({type: PUBLISH_ALBUM_SUCCESS, payload: id});
const publishAlbumFailure = error => ({type: PUBLISH_ALBUM_FAILURE, payload: error});

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

export const getAlbums = () => {
    return async dispatch => {
        try {
            dispatch(getAlbumsRequest());
            const albums = await axiosApi(`/albums`);
            dispatch(getAlbumsSuccess(albums.data));
        } catch (e) {
            dispatch(getAlbumsFailure(e));
        }
    };
};

export const addAlbum = (albumData) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            dispatch(addAlbumRequest());

            await axiosApi.post('/albums', albumData, {headers});
            dispatch(addAlbumSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addAlbumFailure(e.response.data));
            } else {
                dispatch(addAlbumFailure({global: 'No internet'}));
            }

            throw e;
        }
    };
};

export const deleteAlbum = (albumId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;


            dispatch(deleteAlbumRequest());
            await axiosApi.delete('/albums', {
                headers: {
                    Authorization: token
                },
                data: {
                    album: albumId
                }
            });
            dispatch(deleteAlbumSuccess(albumId));
        } catch (e) {
            dispatch(deleteAlbumFailure(e));
        }
    };
};

export const publishAlbum = (albumId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;


            dispatch(publishAlbumRequest());
            await axiosApi.post(`/albums/${albumId}/publish`, albumId, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(publishAlbumSuccess(albumId));
        } catch (e) {
            dispatch(publishAlbumFailure(e));
        }
    };
};