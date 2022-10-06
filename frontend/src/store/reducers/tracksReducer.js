import {
    ADD_TRACK_FAILURE,
    ADD_TRACK_REQUEST,
    ADD_TRACK_SUCCESS, CLEAR_ADD_TRACK_ERROR, DELETE_TRACK_FAILURE, DELETE_TRACK_REQUEST, DELETE_TRACK_SUCCESS,
    GET_TRACKS_FAILURE,
    GET_TRACKS_REQUEST,
    GET_TRACKS_SUCCESS, PUBLISH_TRACK_FAILURE, PUBLISH_TRACK_REQUEST, PUBLISH_TRACK_SUCCESS
} from "../actions/tracksActions";

const initialState = {
    tracks: [],
    loading: false,
    error: null,
    addError: null,
    addLoading: false,
    deleteError: null,
    deleteLoading: false,
    publishError: null,
    publishLoading: false,
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

        case DELETE_TRACK_REQUEST:
            return {...state, deleteLoading: true, deleteError: null};
        case DELETE_TRACK_SUCCESS:
            const newTracks = state.tracks.filter(track => track._id !== action.payload);
            return {...state, deleteLoading: false, tracks: newTracks};
        case DELETE_TRACK_FAILURE:
            return {...state, deleteLoading: false, deleteError: action.payload};

        case PUBLISH_TRACK_REQUEST:
            return {...state, publishLoading: true, publishError: null};
        case PUBLISH_TRACK_SUCCESS:
            const updateState = state.tracks.map(track => {
                if (track._id === action.payload) {
                    track.published = true;
                    return track;
                }
                return track;
            });

            return {...state, publishLoading: false, tracks: updateState};
        case PUBLISH_TRACK_FAILURE:
            return {...state, publishLoading: false, publishError: action.payload};

        default:
            return state;
    }
};

export default tracksReducer;