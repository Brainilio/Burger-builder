import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

export const purchaseBurgerSuccess = (id, orderdata) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderdata,
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	}
}

//async code to send burger to firebase
export const purchaseBurgerStart = (orderData) => {
	return (dispatch) => {
		axios
			.post("/orders.json", orderData)
			.then((response) => {
				console.log(response.data)
				dispatch(purchaseBurgerSuccess(response.data, orderData))
			})
			.catch((error) => {
				dispatch(purchaseBurgerFail(error))
			})
	}
}
