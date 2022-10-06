import {
    ADD_ALBUM_FAILURE,
    ADD_ALBUM_REQUEST, ADD_ALBUM_SUCCESS, CLEAR_ADD_ALBUM_ERROR,
    GET_ARTIST_ALBUMS_FAILURE,
    GET_ARTIST_ALBUMS_REQUEST,
    GET_ARTIST_ALBUMS_SUCCESS
} from "../actions/albumsActions";

const initialState = {
    albums: null,
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTIST_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ARTIST_ALBUMS_SUCCESS:
            return {...state, loading: false, albums: action.payload};
        case GET_ARTIST_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_ALBUM_REQUEST:
            return {...state, addLoading: true, addError: null};
        case ADD_ALBUM_SUCCESS:
            return {...state, addLoading: false};
        case ADD_ALBUM_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case CLEAR_ADD_ALBUM_ERROR:
            return {...state, addError: null};
        default:
            return state;
    }
};

export default albumsReducer;
