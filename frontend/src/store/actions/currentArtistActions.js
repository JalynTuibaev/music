export const GET_CURRENT_ARTIST = 'GET_CURRENT_ARTIST';
export const CLEAR_CURRENT_ARTIST = 'CLEAR_CURRENT_ARTIST';



const getCurrentArtist = artist => ({type: GET_CURRENT_ARTIST, payload: artist});
const clearCurrent = () => ({type: CLEAR_CURRENT_ARTIST});

export const currentArtist = artist => {
    return dispatch => {
        dispatch(getCurrentArtist(artist));
    };
};

export const clearCurrentArtist = () => {
    return dispatch => {
        dispatch(clearCurrent());
    };
};