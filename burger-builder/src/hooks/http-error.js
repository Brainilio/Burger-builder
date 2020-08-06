import { useState, useEffect } from "react"

export default (axios) => {
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
	}, [
		axios.interceptors.request,
		axios.interceptors.response,
		reqInterceptor,
		resInterceptor,
	]) //run only when these two values change

	const errorConfirmedHandler = () => {
		setError(null)
	}

	return [error, errorConfirmedHandler]
}
