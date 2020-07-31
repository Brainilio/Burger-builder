import React, { Component } from "react"
import Order from "../../components/Order/Order"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	}

	componentDidMount() {}

	render() {
		let orders = <Spinner />
		if (this.state.loading === false) {
		}
		return (
			<div>
				<h1 style={{ textAlign: "center" }}>Your orders: </h1>
				{this.state.orders.map(
					(order) =>
						(order = (
							<Order
								key={order.id}
								ingredients={order.ingredients}
								price={+order.price}
							/>
						))
				)}
			</div>
		)
	}
}

export default withErrorHandler(Orders, axios)
