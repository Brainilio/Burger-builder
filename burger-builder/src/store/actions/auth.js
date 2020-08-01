import * as actionTypes from "./actionTypes"
import axios from "axios"

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
				console.log(res)
				dispatch(authSuccess(res))
			})
			.catch((err) => {
				console.log(err)
				dispatch(authFail(err))
			})
	}
}
