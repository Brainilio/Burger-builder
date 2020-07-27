import React, { Component } from "react"
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary"
import { Route } from "react-router-dom"
import { connect } from "react-redux"

import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
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
					ingredients={this.props.ings}
				/>
				<Route
					path={this.props.match.url + "/contact-data"}
					render={(props) => (
						<ContactData
							ingredients={this.props.ings}
							price={this.props.price}
							// ALL PROPS passed
							{...props}
						/>
					)}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	}
}

export default connect(mapStateToProps)(Checkout)
