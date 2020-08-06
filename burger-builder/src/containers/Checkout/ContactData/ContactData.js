import React, { useState, useEffect } from "react"
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

const ContactData = (props) => {
	const [orderForm, setOrderForm] = useState({
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
	})

	const [formisValid, setFormIsValid] = useState(false)

	//send order to database
	const orderHandler = (event) => {
		//not to prevent the default (sending request because its a button)
		event.preventDefault()

		//CUSTOMER DATA
		const formData = {}
		for (let key in orderForm) {
			formData[key] = orderForm[key].value
		}

		//object that i want to send to the server
		const order = {
			ingredients: props.ings,
			price: props.price,
			customer: formData,
			userId: props.userId,
		}

		props.onOrderHandler(order, props.token)
	}

	//inputchangehandler
	const inputChangedHandler = (e, inputID) => {
		//copy form
		const updatedOrderForm = {
			...orderForm,
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

		setOrderForm(updatedOrderForm)
		setFormIsValid(formisValid)
	}

	const formElementsArray = []
	for (let key in orderForm) {
		//grab all keys, and access orderform for each key now:
		formElementsArray.push({
			id: key,
			config: orderForm[key],
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
					changed={(event) => inputChangedHandler(event, formElement.id)}
				/>
			))}
			<Button disabled={!formisValid} btnType="Success" clicked={orderHandler}>
				ORDER
			</Button>
		</form>
	)
	if (props.loading) {
		form = <Spinner />
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter your contact data</h4>
			{form}
		</div>
	)
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
