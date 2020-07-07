import React from "react"
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import { Component } from "react"

class App extends Component {
	// see if errorboundary unmounts
	state = {
		show: true,
	}

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.setState({ show: false })
	// 	}, 5000)
	// }

	render() {
		return (
			<div>
				<Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
			</div>
		)
	}
}

export default App
