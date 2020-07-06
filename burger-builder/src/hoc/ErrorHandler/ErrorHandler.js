import React from "react"
import Modal from "../../components/UI/Modal/Modal"
import axios from "../../axios-orders"

import { Component } from "react"

// TO DO: FIX THIS BUG

const withErrorHandler = (WrappedComponent, axios) => {
	//create anonymous class
	return class extends Component {
		state = {
			error: null,
		}
		componentDidMount() {
			//IF I HAVE request, set error to null
			axios.interceptors.request.use((req) => {
				this.setState({ error: null })
				return req
			})
			//show error
			axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({ error: error })
				}
			)
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}
		render() {
			return (
				<>
					{/* if error is not null shows modal */}
					<Modal clicked={this.errorConfirmedHandler} show={this.state.error}>
						Something went wrong.. Try again?:{" "}
						{this.state.error ? this.state.error : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			)
		}
	}
}

export default withErrorHandler
