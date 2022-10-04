import {
    CLEAR_LOGIN_ERRORS,
    CLEAR_REGISTER_ERRORS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    user: null,
    registerError: null,
    registerLoading: false,
    loginError: null,
    loginLoading: false,
    logoutLoading: false,
    logoutError: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true, registerError: null};
        case REGISTER_USER_SUCCESS:
            return {...state, registerLoading: false, user: action.payload};
        case REGISTER_USER_FAILURE:
            return {...state, registerLoading: false, registerError: action.payload};
        case CLEAR_REGISTER_ERRORS:
            return {...state, registerError: null};

        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true, loginError: null};
        case LOGIN_USER_SUCCESS:
            return {...state, loginLoading: false, user: action.payload};
        case LOGIN_USER_FAILURE:
            return {...state, loginLoading: false, loginError: action.payload};
        case CLEAR_LOGIN_ERRORS:
            return {...state, loginError: null};

        case LOGOUT_USER_REQUEST:
            return {...state, logoutLoading: true, logoutError: null};
        case LOGOUT_USER_SUCCESS:
            return {...state, logoutLoading: false, user: null};
        case LOGOUT_USER_FAILURE:
            return {...state, logoutLoading: false, logoutError: action.payload};

        default:
            return state;
    }
};

export default usersReducer;