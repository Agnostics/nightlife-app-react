import {
  YELP_REQUEST,
  YELP_SUCCESS,
  YELP_FAILURE,
  ATTEND_REQUEST,
  ATTEND_SUCCESS,
  ATTEND_FAILURE,
} from '../actions/yelp';

const initialState = {
  data: null,
  fetching: false,
  loginError: null,
};

function initializeState() {
  return Object.assign({}, initialState);
}

export default function auth(state = initializeState(), action = {}) {
  switch (action.type) {
    case YELP_REQUEST:
      return {
		...state,
        fetching: true,
	  };
  case YELP_SUCCESS:
    return {
		...state,
      	fetching: false,
 	  	data: action.data,
	  };
  case YELP_FAILURE:
    return {
      ...state,
      fetching: false,
      data: null,
      loginError: action.error,
    };
	case ATTEND_REQUEST:
	  return {
		...state,
		fetching: true,
	  };
	case ATTEND_SUCCESS:
	return {
		...state,
		fetching: false,
		data: action.data,
	  };
	case ATTEND_FAILURE:
	return {
	  ...state,
	  fetching: false,
	  data: null,
	  loginError: action.error,
	};
  default:
    return state;
  }
}
