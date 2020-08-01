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
	building: false,
}

//method for adding ingredient
const addIngredient = (state, action) => {
	const updatedProperties = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	}
	const updatedObject = updateObject(state.ingredients, updatedProperties)
	const updatedState = {
		ingredients: updatedObject,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true,
	}
	return updateObject(state, updatedState)
}

//method for removing ingredient
const removeIngredient = (state, action) => {
	const updatedProperties1 = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	}
	const updatedObject1 = updateObject(state.ingredients, updatedProperties1)
	const updatedState1 = {
		ingredients: updatedObject1,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true,
	}
	return updateObject(state, updatedState1)
}

//method for setting ingredient
const setIngredient = (state, action) => {
	return updateObject(state, {
		ingredients: action.ingredients,
		totalPrice: 4,
		error: false,
		building: false,
	})
}

//failed ingredient fetch
const fetchIngredientsFailed = (state, action) => {
	return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action)
		case actionTypes.DELETE_INGREDIENT:
			return removeIngredient(state, action)
		case actionTypes.SET_INGREDIENTS:
			return setIngredient(state, action)
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action)
		default:
			return state
	}
}

export default reducer
