import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility"

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
	error: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			const updatedProperties = {
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
			}
			const updatedObject = updateObject(state.ingredients, updatedProperties)
			const updatedState = {
				ingredients: updatedObject,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
			}
			return updateObject(state, updatedState)
		case actionTypes.DELETE_INGREDIENT:
			const updatedProperties1 = {
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
			}
			const updatedObject1 = updateObject(state.ingredients, updatedProperties1)
			const updatedState1 = {
				ingredients: updatedObject1,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
			}
			return updateObject(state, updatedState1)
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: 4,
				error: false,
			}
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			}
		default:
			return state
	}
}

export default reducer
