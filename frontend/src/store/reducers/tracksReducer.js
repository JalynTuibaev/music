import {
    ADD_TRACK_FAILURE,
    ADD_TRACK_REQUEST,
    ADD_TRACK_SUCCESS, CLEAR_ADD_TRACK_ERROR,
    GET_TRACKS_FAILURE,
    GET_TRACKS_REQUEST,
    GET_TRACKS_SUCCESS
} from "../actions/tracksActions";

const initialState = {
    tracks: [],
    loading: false,
    error: null,
    addError: null,
    addLoading: false,
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_TRACKS_SUCCESS:
            return {...state, loading: false, tracks: action.payload};
        case GET_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_TRACK_REQUEST:
            return {...state, addLoading: true, addError: null};
        case ADD_TRACK_SUCCESS:
            return {...state, addLoading: false};
        case ADD_TRACK_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case CLEAR_ADD_TRACK_ERROR:
            return {...state, addError: null};
        default:
            return state;
    }
};

export default tracksReducer;