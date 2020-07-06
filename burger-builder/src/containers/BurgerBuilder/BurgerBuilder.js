import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"

// Price for each ingredient
const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.5,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	// State for ingredients and amount of ingredients in 1 burger
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
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

		this.setState({ purchasable: sum > 0 }) //set purchasable on true when sum is larger than 0
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		const updatedCounted = oldCount + 1
		const updatedIngredients = {
			...this.state.ingredients,
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
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCounted
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		})
		this.updatePurchaseState(updatedIngredients)
	}

	purchaseHandler = () => {
		//set state the opposite of what it is right now
		this.setState((prevState) => {
			return { purchasing: !prevState.purchasing }
		})
	}

	// HTTP request
	purchaseContinueHandler = () => {
		// alert("You Continue!")

		//set loading to true
		this.setState({ loading: !this.state.loading })

		//object that i want to send to the server
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Brainilio",
				address: {
					city: "San Jose",
					country: "USA",
				},
				email: "BrainilioIR@gmail.com",
			},
			deliveryMethod: "fastest",
		}

		//.json for firebase
		axios
			.post("/orders.json", order)
			.then((response) => {
				console.log(response)
				this.setState({ loading: false })
				this.purchaseHandler()
			})
			.catch((error) => {
				console.log(error)
				this.setState({ loading: false })
				this.purchaseHandler()
			})
	}

	render() {
		// Disable button if ingredient count is 0
		const disabledInfo = {
			...this.state.ingredients,
		}
		// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// { salad: true, meat: false etc.}

		//check the http request for spinner
		let orderSummary = (
			<OrderSummary
				price={this.state.totalPrice}
				cancelClick={this.purchaseHandler}
				continueClick={this.purchaseContinueHandler}
				ingredients={this.state.ingredients}
			/>
		)
		//if loading is true aka if you're checking out then show spinner
		if (this.state.loading) {
			orderSummary = <Spinner />
		}
		return (
			<>
				{/* Granular focussed, modal is a higher order component and passes the props.chidlren */}
				<Modal modalClosed={this.purchaseHandler} show={this.state.purchasing}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					IngredientAdded={this.addIngredientHandler}
					IngredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</>
		)
	}
}

export default BurgerBuilder
