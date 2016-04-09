import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/auth';

const initialState = {
  user: null,
  password: null,
  loggingIn: false,
  loggingOut: false,
  loginError: null,
};

function initializeState() {
  return Object.assign({}, initialState);
}

export default function auth(state = initializeState(), action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
		...state,
        loggingIn: true,
	  };
  case LOGIN_SUCCESS:
    return {
		...state,
      	loggingIn: false,
 	  	user: action.user,
	  };
  case LOGIN_FAILURE:
    return {
      ...state,
      loggingIn: false,
      user: null,
      loginError: action.error,
    };
  case LOGOUT_REQUEST:
    return {
      ...state,
      loggingOut: true,
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      loggingOut: false,
      user: null,
      loginError: null,
    };
  case LOGOUT_FAILURE:
    return {
      ...state,
      loggingOut: false,
      logoutError: action.error,
    };
  default:
    return state;
  }
}
