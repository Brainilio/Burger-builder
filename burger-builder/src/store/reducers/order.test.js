import reducer from "./order"
import * as actionTypes from "../actions/actionTypes"

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
}

describe("Order reducer", () => {
	it("Should add orders to order list after fetch-success", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.FETCH_ORDERS_SUCCESS,
				orders: "orders",
			})
		).toEqual({
			...initialState,
			loading: false,
			orders: "orders",
		})
	})
})
