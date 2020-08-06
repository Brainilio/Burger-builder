import React, { useState, useEffect } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"

const BurgerBuilder = (props) => {
	// State for ingredients and amount of ingredients in 1 burger

	const [purchasing, setPurchasing] = useState(false)

	const { onInitIngredients } = props

	useEffect(() => {
		onInitIngredients()
	}, [onInitIngredients])

	const updatePurchaseState = (ingredients) => {
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

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			//set state the opposite of what it is right now
			setPurchasing((prevstate) => !prevstate)
		} else {
			props.onSetAuthRedirectPath("/checkout")
			props.history.push("/auth")
		}
	}

	// HTTP request
	const purchaseContinueHandler = () => {
		props.onInitPurchase()
		props.history.push("/checkout")
	}

	// { salad: true, meat: false etc.}
	let orderSummary = null
	let burger = props.error ? (
		<p>Ingredients can't be loaded.. Try again later. </p>
	) : (
		<Spinner />
	)

	// Disable button if ingredient count is 0
	const disabledInfo = {
		...props.ings,
	}
	// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}

	if (props.ings) {
		burger = (
			<>
				<Burger ingredients={props.ings} />
				<BuildControls
					IngredientAdded={props.onIngredientAdded}
					IngredientRemoved={props.onIngredientRemoved}
					disabled={disabledInfo}
					price={props.price}
					purchasable={updatePurchaseState(props.ings)}
					ordered={purchaseHandler}
					isAuth={props.isAuthenticated}
				/>
			</>
		)
		orderSummary = (
			<OrderSummary
				price={props.price}
				cancelClick={purchaseHandler}
				continueClick={purchaseContinueHandler}
				ingredients={props.ings}
			/>
		)
	}

	return (
		<>
			{/* Granular focussed, modal is a higher order component and passes the props.chidlren */}
			<Modal modalClosed={purchaseHandler} show={purchasing}>
				{orderSummary}
			</Modal>
			{burger}
		</>
	)
}

//map the state from reducer to props
const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	}
}

// map dispatch functions to props
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	}
}

//conect
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
