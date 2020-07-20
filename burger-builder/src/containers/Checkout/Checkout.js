import React, { Component } from "react"
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary"
import { Route } from "react-router-dom"

import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
	}

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		let price = 0

		// extract ingredients from query and then
		for (let param of query.entries()) {
			if (param[0] === "price") {
				price = param[1]
			} else {
				// key + value added to ingredients
				ingredients[param[0]] = +param[1]
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: price })
	}

	checkoutCancelledHandler = () => {
		//goback method!
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data")
	}

	render() {
		return (
			<div>
				<Checkoutsummary
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
					ingredients={this.state.ingredients}
				/>
				<Route
					path={this.props.match.url + "/contact-data"}
					render={(props) => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							// ALL PROPS passed
							{...props}
						/>
					)}
				/>
			</div>
		)
	}
}

export default Checkout
