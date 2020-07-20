import React from "react"
import classes from "./Checkoutsummary.module.css"
import Burger from "../../Burger/Burger"
import Button from "../../UI/Button/Button"

const Checkoutsummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>Does your order satisfy you?</h1>
			<div style={{ width: "300px", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked>
				CANCEL
			</Button>
			<Button btnType="Success" clicked>
				ORDER
			</Button>
		</div>
	)
}

export default Checkoutsummary
