import {
    ADD_TRACK_HISTORY_FAILURE,
    ADD_TRACK_HISTORY_REQUEST,
    ADD_TRACK_HISTORY_SUCCESS, GET_TRACK_HISTORY_FAILURE, GET_TRACK_HISTORY_REQUEST, GET_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoriesActions";

const initialState = {
    trackHistory: [],
    addLoading: false,
    addError: null,
    getLoading: false,
    getError: null,
};

const trackHistoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRACK_HISTORY_REQUEST:
            return {...state, addLoading: true, addError: null};
        case ADD_TRACK_HISTORY_SUCCESS:
            return {...state, addLoading: false};
        case ADD_TRACK_HISTORY_FAILURE:
            return {...state, addLoading: false, addError: action.payload};

        case GET_TRACK_HISTORY_REQUEST:
            return {...state, getLoading: true, getError: null};
        case GET_TRACK_HISTORY_SUCCESS:
            return {...state, getLoading: false, trackHistory: action.payload};
        case GET_TRACK_HISTORY_FAILURE:
            return {...state, getLoading: false, getError: action.payload};
        default:
            return state;
    }
};

export default trackHistoriesReducer;