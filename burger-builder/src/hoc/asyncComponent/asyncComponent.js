import React, { Component } from "react"

const asyncComponent = (importComponent) => {
	return class extends Component {
		state = {
			component: null,
		}

		componentDidMount() {
			//promise component
			importComponent().then((cmp) => {
				this.setState({ component: cmp.default })
			})
		}

		render() {
			const C = this.state.component
			//check if component has been resolved yes or no
			return C ? <C {...this.props} /> : null
		}
	}
}

export default asyncComponent
