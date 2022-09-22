import {CLEAR_CURRENT_ARTIST, GET_CURRENT_ARTIST} from "../actions/currentArtistActions";

const initialState = {
    currentArtist: null,
};

const currentArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_ARTIST:
            return {...state, currentArtist: action.payload};
        case CLEAR_CURRENT_ARTIST:
            return {...state, currentArtist: null};
        default:
            return state;
    }
};

export default currentArtistReducer;