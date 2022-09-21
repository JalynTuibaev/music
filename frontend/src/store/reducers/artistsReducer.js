import {GET_ARTISTS_FAILURE, GET_ARTISTS_REQUEST, GET_ARTISTS_SUCCESS} from "../actions/artistsActions";

const initialState = {
    artists: null,
    loading: false,
    error: null,
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ARTISTS_SUCCESS:
            return {...state, loading: false, artists: action.payload};
        case GET_ARTISTS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default artistsReducer;