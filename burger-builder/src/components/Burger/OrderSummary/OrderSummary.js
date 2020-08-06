import React from "react"
import Button from "../../UI/Button/Button"

const OrderSummary = (props) => {
	// take ingreidnets an use object.keys to transform into array of keys: value
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				{/* igkey = the key and props.ingredients[key] reads the value */}
				<span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
				{props.ingredients[igKey]}
			</li>
		)
	})

	return (
		<>
			<h3>Your Order</h3>
			<p>Your selected ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total Price: ${props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.cancelClick}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.continueClick}>
				CHECKOUT
			</Button>
		</>
	)
}

export default OrderSummary
