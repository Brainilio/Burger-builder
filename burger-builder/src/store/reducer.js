import * as actionTypes from "./actions"

// Price for each ingredient
const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.5,
	meat: 1.3,
	bacon: 0.7,
}

//initial state for ingredients
const initialState = {
	ingredients: null,
	totalPrice: 4,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
			}
		case actionTypes.DELETE_INGREDIENT:
			return {
				...state,
			}
		default:
			return state
	}
}

export default reducer
