import React from "react"
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {
	// Loop through given object
	const transformedIngredients = Object.keys(props.ingredients) // Loop through ingredients object and pass in the keys (the name of the ingredient)
		.map((igKey) => {
			//map through all the names.
			// return console.log(igKey)
			return [...Array(props.ingredients[igKey])] // make an array with the length of all the names that are there
				.map((_, i) => {
					//_ being all the arrays and i being the amount of times the name appears in here
					return <BurgerIngredient key={igKey + i} type={igKey} /> // return burger ingredient with igkey being the name and the amount of times it appears int here, so if salad returns (i) times, then return it that many times
				}) // [' .. ']
		})

	console.log(transformedIngredients)
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default burger
