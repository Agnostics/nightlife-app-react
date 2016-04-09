import {
  YELP_REQUEST,
  YELP_SUCCESS,
  YELP_FAILURE,
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
  default:
    return state;
  }
}
