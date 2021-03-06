import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import Spinner from "../../../components/UI/Spinner/Spinner"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Input from "../../../components/UI/Input/Input"
import { connect } from "react-redux"
import { checkValidity } from "../../../shared/checkvalidity"
import withErrorHandler from "../../../hoc/ErrorHandler/ErrorHandler"
import * as actions from "../../../store/actions/index"

//YOU CAN ALSO USE https://validatejs.org/ for validation

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your name..",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street..",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP code..",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail..",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "fastest",
				validation: {},
				valid: true,
			},
		},
		formisValid: false,
	}

	//send order to database
	orderHandler = (event) => {
		//not to prevent the default (sending request because its a button)
		event.preventDefault()

		//set loading to true
		this.setState({ loading: !this.props.loading })

		//CUSTOMER DATA
		const formData = {}
		for (let key in this.state.orderForm) {
			formData[key] = this.state.orderForm[key].value
		}

		//object that i want to send to the server
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			customer: formData,
			userId: this.props.userId,
		}

		this.props.onOrderHandler(order, this.props.token)
	}

	//inputchangehandler
	inputChangedHandler = (e, inputID) => {
		//copy form
		const updatedOrderForm = {
			...this.state.orderForm,
		}
		//clone specific fields from a key
		const updatedFormEl = { ...updatedOrderForm[inputID] }

		//change value
		updatedFormEl.value = e.target.value

		//set validity
		updatedFormEl.valid = checkValidity(
			updatedFormEl.value,
			updatedFormEl.validation
		)

		//set touched to true
		updatedFormEl.touched = true

		//change the form's field with cloned and mutated field
		updatedOrderForm[inputID] = updatedFormEl

		let formisValid = true

		for (let inputid in updatedOrderForm) {
			//is this given element valid? then set to true, and if this is false; set to false.
			formisValid = updatedOrderForm[inputid].valid && formisValid
		}

		this.setState({ orderForm: updatedOrderForm, formisValid: formisValid })
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			//grab all keys, and access orderform for each key now:
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			})
		}
		let form = (
			<form>
				{formElementsArray.map((formElement) => (
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
				))}
				<Button
					disabled={!this.state.formisValid}
					btnType="Success"
					clicked={this.orderHandler}
				>
					ORDER
				</Button>
			</form>
		)
		if (this.props.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderHandler: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios))
