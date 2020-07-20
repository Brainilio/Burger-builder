import React, { Component } from "react"
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary"

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			cheese: 1,
			bacon: 1,
		},
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
			</div>
		)
	}
}

export default Checkout
