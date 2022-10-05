import {
    ADD_ARTIST_FAILURE,
    ADD_ARTIST_REQUEST, ADD_ARTIST_SUCCESS,
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS
} from "../actions/artistsActions";

const initialState = {
    artists: null,
    loading: false,
    error: null,
    addError: null,
    addLoading: false,
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

        default:
            return state;
    }
};

export default artistsReducer;