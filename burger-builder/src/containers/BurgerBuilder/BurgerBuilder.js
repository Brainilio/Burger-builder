import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls"

// Price for each ingredient
const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.5,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	// constructor(props) {
	//     super(props);
	//     this.state = {...}
	// }

	// State for ingredients and amount of ingredients in 1 burger
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false
	}

	updatePurchaseState = (ingredients) => {
		// Check value of ingredients
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)

		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		const updatedCounted = oldCount + 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCounted
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		if (oldCount <= 0) {
			return
		}
		const updatedCounted = oldCount - 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCounted
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		})
		this.updatePurchaseState(updatedIngredients)
	}

	render() {
		// Disable button if ingredient count is 0
		const disabledInfo = {
			...this.state.ingredients
		}
		// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// { salad: true, meat: false etc.}
		return (
			<>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					IngredientAdded={this.addIngredientHandler}
					IngredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
				/>
			</>
		)
	}
}

export default BurgerBuilder
