import React, { useState, useEffect } from "react"

import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [error, setError] = useState(null)

		//add interceptors

		const reqInterceptor = axios.interceptors.request.use((req) => {
			setError(null)
			return req
		})
		const resInterceptor = axios.interceptors.response.use(
			(res) => res,
			(error) => {
				setError(error)
			}
		)

		//get rid of interceptors
		useEffect(() => {
			return () => {
				//eject the interceptors
				axios.interceptors.request.eject(reqInterceptor)
				axios.interceptors.response.eject(resInterceptor)
			}
		}, [reqInterceptor, resInterceptor]) //run only when these two values change

		const errorConfirmedHandler = () => {
			setError(null)
		}

		return (
			<>
				<Modal show={error} modalClosed={errorConfirmedHandler}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</>
		)
	}
}

export default withErrorHandler
