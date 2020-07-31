import * as actionTypes from "./actionTypes"

//action creators

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	}
}

export const removeIngredient = (name) => {
	return {
		type: actionTypes.DELETE_INGREDIENT,
		ingredientName: name,
	}
}

export const initIngredients = () => {
	return (dispatch) => {}
}
