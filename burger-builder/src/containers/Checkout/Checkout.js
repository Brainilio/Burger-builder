import React, { useEffect } from "react"
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import ContactData from "./ContactData/ContactData"
import axios from "../../axios-orders"

const Checkout = (props) => {
	const { ings } = props

	useEffect(() => {
		// Disable button if ingredient count is 0
		const disabledInfo = {
			...ings,
		}
		// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		if (ings === null || disabledInfo === false) {
			goBackHandler()
		}
	}, [ings])

	const checkoutCancelledHandler = () => {
		//goback method!
		props.history.goBack()
	}

	const checkoutContinuedHandler = () => {
		props.history.replace("/checkout/contact-data")
	}

	const goBackHandler = () => {
		props.history.goBack()
	}

	let summary = <Redirect to="/" />
	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
		summary = (
			<div>
				{purchasedRedirect}
				<Checkoutsummary
					checkoutCancelled={checkoutCancelledHandler}
					checkoutContinued={checkoutContinuedHandler}
					ingredients={props.ings}
				/>
				<Route
					path={props.match.url + "/contact-data"}
					render={(props) => (
						<ContactData
							// ALL PROPS passed
							{...props}
						/>
					)}
				/>
			</div>
		)
	}
	return <>{summary}</>
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased,
	}
}

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios))
