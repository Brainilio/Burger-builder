import React from "react"

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
	console.log(ingredientSummary)

	return (
		<>
			<h3>Your Order</h3>
			<p>Your selected ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to Checkout?</p>
		</>
	)
}

export default OrderSummary
