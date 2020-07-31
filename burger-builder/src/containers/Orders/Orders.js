import React, { Component } from "react"
import Order from "../../components/Order/Order"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders()
	}

	render() {
		let orders = <Spinner />
		if (!this.props.loading) {
			orders = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			))
		}
		return (
			<div>
				<h1 style={{ textAlign: "center", fontSize: "25px" }}>Your orders:</h1>
				{orders}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios))
