import * as actionTypes from "./actionTypes"

//set loading state
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

//success form
export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	}
}

//fail form
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

//sending the form to the server, holding async code
export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart)
		// ... authenticate user
	}
}
