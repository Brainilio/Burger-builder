import React, { useState, useEffect, useCallback } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import { connect, useDispatch, useSelector } from "react-redux"
import * as actions from "../../store/actions/index"

const BurgerBuilder = (props) => {
	// State for ingredients and amount of ingredients in 1 burger

	const [purchasing, setPurchasing] = useState(false)

	const dispatch = useDispatch()

	const ings = useSelector((state) => {
		return state.burgerBuilder.ingredients
	})
	const price = useSelector((state) => {
		return state.burgerBuilder.totalPrice
	})
	const error = useSelector((state) => {
		return state.burgerBuilder.error
	})
	const isAuthenticated = useSelector((state) => {
		return state.auth.token !== null
	})

	const onIngredientAdded = (ingName) =>
		dispatch(actions.addIngredient(ingName))
	const onIngredientRemoved = (ingName) =>
		dispatch(actions.removeIngredient(ingName))
	const onInitIngredients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	)
	const onInitPurchase = () => dispatch(actions.purchaseInit())
	const onSetAuthRedirectPath = (path) =>
		dispatch(actions.setAuthRedirectPath(path))

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
		if (isAuthenticated) {
			//set state the opposite of what it is right now
			setPurchasing((prevstate) => !prevstate)
		} else {
			onSetAuthRedirectPath("/checkout")
			props.history.push("/auth")
		}
	}

	// HTTP request
	const purchaseContinueHandler = () => {
		onInitPurchase()
		props.history.push("/checkout")
	}

	// { salad: true, meat: false etc.}
	let orderSummary = null
	let burger = error ? (
		<p>Ingredients can't be loaded.. Try again later. </p>
	) : (
		<Spinner />
	)

	// Disable button if ingredient count is 0
	const disabledInfo = {
		...ings,
	}
	// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}

	if (ings) {
		burger = (
			<>
				<Burger ingredients={ings} />
				<BuildControls
					IngredientAdded={onIngredientAdded}
					IngredientRemoved={onIngredientRemoved}
					disabled={disabledInfo}
					price={price}
					purchasable={updatePurchaseState(ings)}
					ordered={purchaseHandler}
					isAuth={isAuthenticated}
				/>
			</>
		)
		orderSummary = (
			<OrderSummary
				price={price}
				cancelClick={purchaseHandler}
				continueClick={purchaseContinueHandler}
				ingredients={ings}
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
	return {}
}

//conect
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
