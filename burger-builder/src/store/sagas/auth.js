import { put } from "redux-saga/effects"
import * as actionTypes from "../actions/actionTypes"
/* turns function into generator; functions which
can be functioned incremently
you can pause functions to wait for async codes
*/

export function* logoutSaga(action) {
	//wait till localstorage is done
	yield localStorage.clear()
	yield put({
		type: actionTypes.AUTH_LOGOUT,
	})
}
