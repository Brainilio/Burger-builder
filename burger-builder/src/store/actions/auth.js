import * as actionTypes from "./actionTypes"
import axios from "axios"

//set loading state
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

//success form
export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	}
}

//fail form
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

//log out constant that will trigger after expirationtime or click
export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

//check time for auth time out
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000) //from ms to s
	}
}

//sending the form to the server, holding async code
export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart())
		// ... authenticate user
		const authData = {
			email: email,
			password: password,

			returnSecureToken: true,
		}
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzs50s6joMpgbYq-8F68xDNE7_qVQkMpo"
		if (!isSignup) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzs50s6joMpgbYq-8F68xDNE7_qVQkMpo"
		}

		axios
			.post(url, authData)
			.then((res) => {
				dispatch(authSuccess(res.data.idToken, res.data.localId))
				dispatch(checkAuthTimeout(res.data.expiresIn))
			})
			.catch((err) => {
				dispatch(authFail(err.response.data.error))
			})
	}
}