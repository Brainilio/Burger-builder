import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../axios-orders"

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
	}

	orderHandler = (event) => {
		//not to prevent the default (sending request because its a button)
		event.preventDefault()
		// alert("You Continue!")
		//set loading to true
		this.setState({ loading: !this.state.loading })
		//object that i want to send to the server
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Brainilio",
				address: {
					city: "San Jose",
					country: "USA",
				},
				email: "BrainilioIR@gmail.com",
			},
			deliveryMethod: "fastest",
		}
		//.json for firebase
		axios
			.post("/orders.json", order)
			.then((response) => {
				console.log(response)
				this.setState({ loading: false })
				this.purchaseHandler()
			})
			.catch((error) => {
				console.log(error)
				this.setState({ loading: false })
				this.purchaseHandler()
			})
	}

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<input type="text" name="name" placeholder="Your name.." />
					<input type="email" name="email" placeholder="Your email.." />
					<input type="text" name="street" placeholder="Your street.." />
					<input type="text" name="postal" placeholder="Your Zipcode.." />
					<Button btnType="Success" clicked={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		)
	}
}

export default ContactData
