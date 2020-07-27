import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import { connect } from "react-redux"
import * as actionTypes from "../../store/actions"

class BurgerBuilder extends Component {
	// State for ingredients and amount of ingredients in 1 burger
	state = {
		purchasing: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		console.log(this.props)
		// axios
		// 	.get(
		// 		"https://react-my-burger-builder-d060b.firebaseio.com/ingredients.json"
		// 	)
		// 	.then((response) => {
		// 		this.setState({ ingredients: response.data })
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ error: true })
		// 	})
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

		return sum > 0 //set purchasable on true when sum is larger than 0
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
		queryParams.push("price=" + this.props.price)
		const queryString = queryParams.join("&")
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

		if (this.props.ings) {
			// Disable button if ingredient count is 0
			const disabledInfo = {
				...this.props.ings,
			}
			// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
			for (let key in disabledInfo) {
				disabledInfo[key] = disabledInfo[key] <= 0
			}
			burger = (
				<>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						IngredientAdded={this.props.onIngredientAdded}
						IngredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</>
			)
			orderSummary = (
				<OrderSummary
					price={this.props.price}
					cancelClick={this.purchaseHandler}
					continueClick={this.purchaseContinueHandler}
					ingredients={this.props.ings}
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

//map the state from reducer to props
const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	}
}

// map dispatch functions to props
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) =>
			dispatch({
				type: actionTypes.DELETE_INGREDIENT,
				ingredientName: ingName,
			}),
	}
}

//conect
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
