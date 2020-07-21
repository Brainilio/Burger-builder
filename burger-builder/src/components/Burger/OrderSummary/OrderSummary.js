import React from "react"
import Button from "../../UI/Button/Button"
import { Component } from "react"

class OrderSummary extends Component {
	// Log whether it will update.
	componentDidUpdate() {
		console.log("Ordersummary did update.")
	}

	render() {
		// take ingreidnets an use object.keys to transform into array of keys: value
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			(igKey) => {
				return (
					<li key={igKey}>
						{/* igkey = the key and props.ingredients[key] reads the value */}
						<span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
						{this.props.ingredients[igKey]}
					</li>
				)
			}
		)

		return (
			<>
				<h3>Your Order</h3>
				<p>Your selected ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: ${this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.cancelClick}>
					CANCEL
				</Button>
				<Button btnType="Success" clicked={this.props.continueClick}>
					CHECKOUT
				</Button>
			</>
		)
	}
}

export default OrderSummary
