import {
    GET_ARTIST_ALBUMS_FAILURE,
    GET_ARTIST_ALBUMS_REQUEST,
    GET_ARTIST_ALBUMS_SUCCESS
} from "../actions/albumsActions";

const initialState = {
    albums: null,
    loading: false,
    error: null,
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTIST_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ARTIST_ALBUMS_SUCCESS:
            return {...state, loading: false, albums: action.payload};
        case GET_ARTIST_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default albumsReducer;
