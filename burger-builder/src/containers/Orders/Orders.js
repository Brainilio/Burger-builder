import React, { useEffect } from "react"
import Order from "../../components/Order/Order"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"

const Orders = (props) => {
	const { token, userId, onFetchOrders } = props
	useEffect(() => {
		onFetchOrders(token, userId)
	}, [token, userId, onFetchOrders])

	let orders = <Spinner />
	if (!props.loading) {
		orders = props.orders.map((order) => (
			<Order
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}
			/>
		))
	}

	return (
		<>
			<div>
				<h1
					style={{
						textAlign: "center",
						fontSize: "25px",
					}}
				>
					Your orders:
				</h1>
				{orders}
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios))
