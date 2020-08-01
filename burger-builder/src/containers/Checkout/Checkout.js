import React, { Component } from "react"
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import ContactData from "./ContactData/ContactData"
import axios from "../../axios-orders"

class Checkout extends Component {
	componentDidMount() {
		// Disable button if ingredient count is 0
		const disabledInfo = {
			...this.props.ings,
		}
		// Loop through copied ingredients with the key, and then check whether key is lower or equal to zero, if so then itll pass true or false back
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		if (this.props.ings === null || disabledInfo === false) {
			this.goBackHandler()
		}
	}

	checkoutCancelledHandler = () => {
		//goback method!
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data")
	}

	goBackHandler = () => {
		this.props.history.goBack()
	}

	render() {
		let summary = <Redirect to="/" />
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null
			summary = (
				<div>
					{purchasedRedirect}
					<Checkoutsummary
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
						ingredients={this.props.ings}
					/>
					<Route
						path={this.props.match.url + "/contact-data"}
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
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased,
	}
}

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios))
