import React from "react"
import useHttpError from "../../hooks/http-error"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		//error handler hook and pass the client (axios)
		const [error, errorConfirmedHandler] = useHttpError(axios)

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
