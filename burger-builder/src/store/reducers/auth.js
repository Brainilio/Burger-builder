import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility"

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: "/",
}

//method for starting auth, loader.
const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true })
}

//auth success
const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false,
	})
}

//fail auth
const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
	})
}

//auth logout
const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		userId: null,
	})
}

//changing redirectpath
const setAuthRedirectPath = (state, action) => {
	return updateObject(state, {
		authRedirectPath: action.path,
	})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action)
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action)
		case actionTypes.AUTH_FAIL:
			return authFail(state, action)
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action)
		case actionTypes.SETH_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action)
		default:
			return state
	}
}

export default reducer
