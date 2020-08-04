import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../shared/utility"

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
}

//purchasing initializing
const purchaseInit = (state, action) => {
	return updateObject(state, { purchased: false })
}

//set loader to true
const purchaseBurgerStart = (state, action) => {
	return updateObject(state, { loading: true })
}

//when purchasing burger, set to state and post to db
const purchaseBurgerSuccess = (state, action) => {
	const newOrder = updateObject(action.orderData, { id: action.orderId })
	return updateObject(state, {
		loading: false,
		purchased: true,
		orders: state.orders.concat(newOrder),
	})
}

//when fetching fails
const purchaseBurgerFail = (state, action) => {
	return updateObject(state, { loading: false })
}
//fetching orders in order page loader
const fetchOrdersStart = (state, action) => {
	return updateObject(state, { loading: true })
}

//fetch success for order page
const fetchOrdersSuccess = (state, action) => {
	return updateObject(state, { orders: action.orders, loading: false })
}

//fetch fail for order page
const fetchOrdersFail = (state, action) => {
	return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return purchaseInit(state, action)
		case actionTypes.PURCHASE_BURGER_START:
			return purchaseBurgerStart(state, action)
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action)
		case actionTypes.PURCHASE_BURGER_FAIL:
			return purchaseBurgerFail(state, action)
		case actionTypes.FETCH_ORDERS_START:
			return fetchOrdersStart(state, action)
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrdersSuccess(state, action)
		case actionTypes.FETCH_ORDERS_FAIL:
			return fetchOrdersFail(state, action)
		default:
			return state
	}
}

export default reducer
