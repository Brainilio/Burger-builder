import React, { Component } from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import classes from "./Auth.module.css"

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
	}

	//validation chcker
	checkValidity(value, rules) {
		if (!rules) {
			return true
		}

		let isValid = true

		// fields need to be filled
		if (rules.required) {
			isValid = value.trim() !== "" && isValid
		}

		//email validation
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
			isValid = pattern.test(value) && isValid
		}

		return isValid
	}

	//inputchangehandler
	inputChangedHandler = (e, controlName) => {
		//copy state controls and change the values
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: e.target.value,
				valid: this.checkValidity(
					e.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		}

		//set state to updated form
		this.setState({ controls: updatedControls })
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
		const form = formElementsArray.map((formElement) => (
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
		return (
			<>
				<h1 style={{ textAlign: "center" }}>Log in</h1>
				<div className={classes.Auth}>
					<form>
						{form}
						<Button btnType="Success">SUBMIT</Button>
					</form>
				</div>
			</>
		)
	}
}

export default Auth
