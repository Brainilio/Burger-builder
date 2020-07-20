import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"

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
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		console.log(this.props)
		axios
			.get(
				"https://react-my-burger-builder-d060b.firebaseio.com/ingredients.json"
			)
			.then((response) => {
				this.setState({ ingredients: response.data })
			})
			.catch((error) => {
				this.setState({ error: true })
			})
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
		const queryParams = []
		//push all ingredients in queryparams with value
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			)
		}
		const queryString = queryParams.join("&")
		queryParams.push("price=" + this.state.totalPrice)
		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryString,
		})
	}

	render() {
		// { salad: true, meat: false etc.}
		let orderSummary = null
		let burger = this.state.error ? (
			<p>Ingredients can't be loaded.. Try again later. </p>
		) : (
			<Spinner />
		)

		if (this.state.ingredients) {
			// Disable button if ingredient count is 0
			const disabledInfo = {
				...this.state.ingredients,
			}
			// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
			for (let key in disabledInfo) {
				disabledInfo[key] = disabledInfo[key] <= 0
			}
			burger = (
				<>
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
			orderSummary = (
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
		}

		return (
			<>
				{/* Granular focussed, modal is a higher order component and passes the props.chidlren */}
				<Modal modalClosed={this.purchaseHandler} show={this.state.purchasing}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios)
