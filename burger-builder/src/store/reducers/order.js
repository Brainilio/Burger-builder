import * as actionTypes from "../actions/actionTypes"

const initialState = {
	orders: [],
	loading: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return {}
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {}
		default:
			return state
	}
}
