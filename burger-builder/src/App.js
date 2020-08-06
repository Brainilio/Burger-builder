import React, { useEffect, Suspense } from "react"
import Layout from "./hoc/Layout/Layout"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"

import Logout from "./containers/Auth/Logout/Logout"

//lazy loading: checkout
const Checkout = React.lazy(() => {
	return import("./containers/Checkout/Checkout")
})

//lazy loading: orders
const Orders = React.lazy(() => {
	return import("./containers/Orders/Orders")
})

//lazy loading: auth
const Auth = React.lazy(() => {
	return import("./containers/Auth/Auth")
})

const App = (props) => {
	const { onTryAutoSignup } = props

	useEffect(() => {
		onTryAutoSignup()
	}, [onTryAutoSignup])

	//protecting routes
	let routes = (
		<>
			<Route path="/auth" component={(props) => <Auth {...props} />} />
			<Route path="/" exact component={BurgerBuilder} />
		</>
	)

	if (props.isAuthenticated) {
		routes = (
			<>
				<Route path="/" exact component={BurgerBuilder} />
				<Route path="/auth" component={(props) => <Auth {...props} />} />
				<Route
					path="/checkout"
					component={(props) => <Checkout {...props} />}
				/>
				<Route path="/orders" component={(props) => <Orders {...props} />} />
				<Route path="/logout" component={Logout} />
			</>
		)
	}

	return (
		<div>
			<Layout>
				<Switch>
					<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
				</Switch>
				<Redirect to="/" />
			</Layout>
		</div>
	)
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
