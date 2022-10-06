import {
    ADD_ALBUM_FAILURE,
    ADD_ALBUM_REQUEST,
    ADD_ALBUM_SUCCESS,
    CLEAR_ADD_ALBUM_ERROR, DELETE_ALBUM_FAILURE, DELETE_ALBUM_REQUEST, DELETE_ALBUM_SUCCESS,
    GET_ALBUMS_FAILURE,
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
    GET_ARTIST_ALBUMS_FAILURE,
    GET_ARTIST_ALBUMS_REQUEST,
    GET_ARTIST_ALBUMS_SUCCESS, PUBLISH_ALBUM_FAILURE, PUBLISH_ALBUM_REQUEST, PUBLISH_ALBUM_SUCCESS
} from "../actions/albumsActions";

const initialState = {
    albums: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
    allAlbums: [],
    allAlbumsError: null,
    allAlbumsLoading: false,
    deleteError: null,
    deleteLoading: false,
    publishError: null,
    publishLoading: false,
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTIST_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ARTIST_ALBUMS_SUCCESS:
            return {...state, loading: false, albums: action.payload};
        case GET_ARTIST_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case GET_ALBUMS_REQUEST:
            return {...state, allAlbumsLoading: true, allAlbumsError: null};
        case GET_ALBUMS_SUCCESS:
            return {...state, allAlbumsLoading: false, allAlbums: action.payload};
        case GET_ALBUMS_FAILURE:
            return {...state, allAlbumsLoading: false, allAlbumsError: action.payload};

        case ADD_ALBUM_REQUEST:
            return {...state, addLoading: true, addError: null};
        case ADD_ALBUM_SUCCESS:
            return {...state, addLoading: false};
        case ADD_ALBUM_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case CLEAR_ADD_ALBUM_ERROR:
            return {...state, addError: null};

        case DELETE_ALBUM_REQUEST:
            return {...state, deleteLoading: true, deleteError: null};
        case DELETE_ALBUM_SUCCESS:
            const newAlbums = state.albums.filter(album => album._id !== action.payload);
            return {...state, deleteLoading: false, albums: newAlbums};
        case DELETE_ALBUM_FAILURE:
            return {...state, deleteLoading: false, deleteError: action.payload};

        case PUBLISH_ALBUM_REQUEST:
            return {...state, publishLoading: true, publishError: null};
        case PUBLISH_ALBUM_SUCCESS:
            const updateState = state.albums.map(album => {
                if (album._id === action.payload) {
                    album.published = true;
                    return album;
                }
                return album;
            });

            return {...state, publishLoading: false, albums: updateState};
        case PUBLISH_ALBUM_FAILURE:
            return {...state, publishLoading: false, publishError: action.payload};
        default:
            return state;
    }
};

export default albumsReducer;
