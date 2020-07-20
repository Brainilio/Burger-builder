import React from "react"
import classes from "./Checkoutsummary.module.css"
import Burger from "../../Burger/Burger"
import Button from "../../UI/Button/Button"

const Checkoutsummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>Satisfied? :)</h1>
			<div style={{ width: "300px", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked={props.checkoutCancelled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.checkoutContinued}>
				ORDER
			</Button>
		</div>
	)
}

export default Checkoutsummary
