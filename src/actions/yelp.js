import $ from 'jquery';

export const YELP_REQUEST = 'YELP_REQUEST';
export const YELP_SUCCESS = 'YELP_SUCCESS';
export const YELP_FAILURE = 'YELP_FAILURE';

export const ATTEND_REQUEST = 'ATTEND_REQUEST';
export const ATTEND_SUCCESS = 'ATTEND_SUCCESS';
export const ATTEND_FAILURE = 'ATTEND_FAILURE';


function yelpRequest() {
  return {
    type: YELP_REQUEST,
  };
}

function yelpSuccess(data) {
  return {
    type: YELP_SUCCESS,
    data,
  };
}

function yelpFailure(error) {
  return {
    type: YELP_FAILURE,
    data: null,
    error,
  };
}

function attendRequest() {
  return {
    type: ATTEND_REQUEST,
  };
}

function attendSuccess(data) {
  return {
    type: ATTEND_SUCCESS,
	data,
  };
}

function attendFailure(error) {
  return {
    type: ATTEND_FAILURE,
    data: null,
    error,
  };
}

export function fetchYelp(location) {
  return dispatch => {
    dispatch(yelpRequest());

	$.ajax({
		url: `/yelp/${location}`,
		dataType: 'json',
		success: (data) => {
			dispatch(yelpSuccess(data))
		},
		error: (err) => {
			dispatch(yelpFailure(err))
		},
	});
  };
}

export function fetchAttend(location, id, name) {
  return dispatch => {
    dispatch(attendRequest());
	$.ajax({
		type: 'POST',
		url: '/yelp',
		data: { location, id, name },
		dataType: 'json',
		success: (data) => {
			dispatch(attendSuccess(data));
		},
		error: (err) => {
			dispatch(attendFailure(err));
		},
	});
  };
}
