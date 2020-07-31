import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

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

//action to set the ingredients int he initialstate to pull them
export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	}
}

//action for setting error to true/false
export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}
}

//axios import here
export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get(
				"https://react-my-burger-builder-d060b.firebaseio.com/ingredients.json"
			)
			.then((response) => {
				dispatch(setIngredients(response.data))
			})
			.catch((error) => {
				dispatch(fetchIngredientsFailed)
			})
	}
}
