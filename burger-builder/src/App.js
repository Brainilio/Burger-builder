import React from "react"
import Layout from "./hoc/Layout/Layout"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"
import { Component } from "react"

import Logout from "./containers/Auth/Logout/Logout"
import asyncComponent from "./hoc/asyncComponent/asyncComponent"

//lazy loading: checkout
const asyncCheckout = asyncComponent(() => {
	return import("./containers/Checkout/Checkout")
})

//lazy loading: orders
const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders")
})

//lazy loading: auth
const asyncAuth = asyncComponent(() => {
	return import("./containers/Auth/Auth")
})

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup()
	}

	render() {
		//protecting routes
		let routes = (
			<>
				<Route path="/auth" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
			</>
		)

		if (this.props.isAuthenticated) {
			routes = (
				<>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/logout" component={Logout} />
				</>
			)
		}
		return (
			<div>
				<Layout>
					<Switch>{routes}</Switch>
					<Redirect to="/" />
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
