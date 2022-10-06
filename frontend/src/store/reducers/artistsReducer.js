import {
    ADD_ARTIST_FAILURE,
    ADD_ARTIST_REQUEST,
    ADD_ARTIST_SUCCESS,
    CLEAR_ADD_ARTIST_ERROR,
    DELETE_ARTIST_FAILURE,
    DELETE_ARTIST_REQUEST,
    DELETE_ARTIST_SUCCESS,
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS, PUBLISH_ARTIST_FAILURE, PUBLISH_ARTIST_REQUEST, PUBLISH_ARTIST_SUCCESS
} from "../actions/artistsActions";

const initialState = {
    artists: [],
    loading: false,
    error: null,
    addError: null,
    addLoading: false,
    deleteError: null,
    deleteLoading: false,
    publishError: null,
    publishLoading: false,
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ARTISTS_SUCCESS:
            return {...state, loading: false, artists: action.payload};
        case GET_ARTISTS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_ARTIST_REQUEST:
            return {...state, addLoading: true, addError: null};
        case ADD_ARTIST_SUCCESS:
            return {...state, addLoading: false};
        case ADD_ARTIST_FAILURE:
            return {...state, addError: action.payload, addLoading: false};
        case CLEAR_ADD_ARTIST_ERROR:
            return {...state, addError: null};

        case DELETE_ARTIST_REQUEST:
            return {...state, deleteLoading: true, deleteError: null};
        case DELETE_ARTIST_SUCCESS:
            const newArtists = state.artists.filter(artist => artist._id !== action.payload);
            return {...state, deleteLoading: false, artists: newArtists};
        case DELETE_ARTIST_FAILURE:
            return {...state, deleteLoading: false, deleteError: action.payload};

        case PUBLISH_ARTIST_REQUEST:
            return {...state, publishLoading: true, publishError: null};
        case PUBLISH_ARTIST_SUCCESS:
            const updateState = state.artists.map(artist => {
                if (artist._id === action.payload) {
                    artist.published = true;
                    return artist;
                }
                return artist;
            });

            return {...state, publishLoading: false, artists: updateState};
        case PUBLISH_ARTIST_FAILURE:
            return {...state, publishLoading: false, publishError: action.payload};

        default:
            return state;
    }
};

export default artistsReducer;