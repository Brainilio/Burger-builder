import React, { useState, useEffect } from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import { Redirect } from "react-router-dom"
import Spinner from "../../components/UI/Spinner/Spinner"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"
import { checkValidity } from "../../shared/checkvalidity"

const Auth = (props) => {
	//local state for form

	const [controls, setControls] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Mail Address..",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Password..",
			},
			value: "",
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	})
	const [isSignup, setIsSignup] = useState(true)

	const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props

	//check building / redirectpath
	useEffect(() => {
		if (buildingBurger === false && authRedirectPath !== "/") {
			onSetAuthRedirectPath()
		}
	}, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

	//inputchangehandler
	const inputChangedHandler = (e, controlName) => {
		//copy state controls and change the values
		const updatedControls = {
			...controls,
			[controlName]: {
				...controls[controlName],
				value: e.target.value,
				valid: checkValidity(e.target.value, controls[controlName].validation),
				touched: true,
			},
		}

		setControls(updatedControls)
	}

	//submit handler
	const submitHandler = (e) => {
		e.preventDefault()
		props.onAuth(controls.email.value, controls.password.value, isSignup)
	}

	//switchAuthMode
	const switchAuthModeHandler = () => {
		setIsSignup((prevState) => !prevState)
	}

	const formElementsArray = []
	for (let key in controls) {
		//grab all keys, and access orderform for each key now:
		formElementsArray.push({
			id: key,
			config: controls[key],
		})
	}
	let form = formElementsArray.map((formElement) => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			valueType={formElement.id}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => inputChangedHandler(event, formElement.id)}
		/>
	))

	if (props.loading) {
		form = <Spinner />
	}

	let errorMessage = null
	if (props.error) {
		errorMessage = <p style={{ color: "red" }}>{props.error.message}</p>
	}

	let authRedirect = null
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirect} />
	}

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Log in</h1>
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={switchAuthModeHandler} btnType="Danger">
					SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
				</Button>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirect: state.auth.authRedirectPath,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
