import React from "react"
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {
	console.log(props)
	// Loop through given object
	let transformedIngredients = Object.keys(props.ingredients) // Loop through ingredients object and pass in the keys (the name of the ingredient)
		.map((igKey) => {
			//map through all the names.
			// return console.log(igKey)
			return [...Array(props.ingredients[igKey])] // make an array with the length of all the names that are there
				.map((_, i) => {
					//_ being all the arrays and i being the amount of times the name appears in here
					return <BurgerIngredient key={igKey + i} type={igKey} /> // return burger ingredient with igkey being the name and the amount of times it appears int here, so if salad returns (i) times, then return it that many times
				}) //now youll get an array for each name (igkey) and then youll get the length of the array being the amount (i) of times 1 (igkey) comes in.
		})
		.reduce((arr, el) => {
			return arr.concat(el) //loops through all values, pulls out all the elemnts and adds it into 1 arr
		}, []) //reduce the array, transforms an array into something else, functions: previous value and current value

	//if transformedingredients length is 0 give message
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

export default burger
