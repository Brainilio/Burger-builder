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
	componentDidMount() {
		axios
			.get("/orders.json")
			.then((response) => {
				const fetchedOrders = []
				for (let key in response.data) {
					fetchedOrders.push({ ...response.data[key], id: key })
				}
				this.setState({ loading: false, orders: fetchedOrders })
			})
			.catch((err) => {
				this.setState({ loading: false })
			})
	}

	render() {
		// let orders = <Spinner />
		// if (this.state.loading == false) {

		// }
		return (
			<div>
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