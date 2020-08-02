import React from "react"
import Layout from "./hoc/Layout/Layout"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"
import { Component } from "react"
import Checkout from "./containers/Checkout/Checkout"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout"

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup()
	}

	render() {
		//protecting routes
		let routes = (
			<>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
			</>
		)

		if (this.props.isAuthenticated) {
			routes = (
				<>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/auth" component={Auth} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
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
