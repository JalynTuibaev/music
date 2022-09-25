import {
    ADD_TRACK_HISTORY_FAILURE,
    ADD_TRACK_HISTORY_REQUEST,
    ADD_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoriesActions";

const initialState = {
    trackHistory: null,
    loading: false,
    error: null,
};

const trackHistoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRACK_HISTORY_REQUEST:
            return {...state, loading: true, error: null};
        case ADD_TRACK_HISTORY_SUCCESS:
            return {...state, loading: false, trackHistory: action.payload};
        case ADD_TRACK_HISTORY_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default trackHistoriesReducer;