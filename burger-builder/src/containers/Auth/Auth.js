import React, { Component } from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import { Redirect } from "react-router-dom"
import Spinner from "../../components/UI/Spinner/Spinner"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"
import { checkValidity } from "../../shared/checkvalidity"

class Auth extends Component {
	//local state for form
	state = {
		controls: {
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
		},
		isSignup: true,
	}

	//check building / redirectpath
	componentDidMount() {
		if (
			this.props.buildingBurger === false &&
			this.props.authRedirectPath !== "/"
		) {
			this.props.onSetAuthRedirectPath()
		}
	}

	//inputchangehandler
	inputChangedHandler = (e, controlName) => {
		//copy state controls and change the values
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: e.target.value,
				valid: checkValidity(
					e.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		}
		this.setState({ controls: updatedControls })
	}

	//submit handler
	submitHandler = (e) => {
		e.preventDefault()
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		)
	}

	//switchAuthMode
	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup }
		})
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.controls) {
			//grab all keys, and access orderform for each key now:
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
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
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		))

		if (this.props.loading) {
			form = <Spinner />
		}

		let errorMessage = null
		if (this.props.error) {
			errorMessage = <p style={{ color: "red" }}>{this.props.error.message}</p>
		}

		let authRedirect = null
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirect} />
		}

		return (
			<>
				<h1 style={{ textAlign: "center" }}>Log in</h1>
				<div className={classes.Auth}>
					{authRedirect}
					{errorMessage}
					<form onSubmit={this.submitHandler}>
						{form}
						<Button btnType="Success">SUBMIT</Button>
					</form>
					<Button clicked={this.switchAuthModeHandler} btnType="Danger">
						SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
					</Button>
				</div>
			</>
		)
	}
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
