import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import Spinner from "../../../components/UI/Spinner/Spinner"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Input from "../../../components/UI/Input/Input"

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
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street..",
				},
				value: "",
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP code..",
				},
				value: "",
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail..",
				},
				value: "",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "",
			},
		},
		loading: false,
	}

	componentDidMount() {
		console.log(this.props.price)
	}

	//send order to database
	orderHandler = (event) => {
		//not to prevent the default (sending request because its a button)
		event.preventDefault()
		// alert("You Continue!")
		//set loading to true
		this.setState({ loading: !this.state.loading })

		//object that i want to send to the server
		const formData = {}
		for (let key in this.state.orderForm) {
			formData[key] = this.state.orderForm[key].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: formData,
			deliveryMethod: "fastest",
		}
		//.json for firebase
		axios
			.post("/orders.json", order)
			.then((response) => {
				console.log(response)
				this.setState({ loading: false })
				this.props.history.push("/")
			})
			.catch((error) => {
				console.log(error)
				this.setState({ loading: false })
			})
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

		//change the form's field with cloned and mutated field
		updatedOrderForm[inputID] = updatedFormEl

		this.setState({ orderForm: updatedOrderForm })
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
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		)
		if (this.state.loading) {
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

export default ContactData
