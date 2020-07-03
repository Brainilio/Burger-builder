import React from "react"
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl"

// Controls for each ingredient
const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
]

const BuildControls = (props) => (
	<div className={classes.BuildControls}>
		{/* Map through controls and pass info down for each buildcontrol */}
		<p>
			Current Price: <strong>${props.price.toFixed(2)}</strong>
		</p>
		{controls.map((control) => (
			<BuildControl
				key={control.label}
				label={control.label}
				added={() => props.IngredientAdded(control.type)}
				removed={() => props.IngredientRemoved(control.type)}
				disabled={props.disabled[control.type]} //access boolean for given type, with the control.type
			/>
		))}
		<button
			onClick={props.ordered}
			className={classes.OrderButton}
			disabled={!props.purchasable}
		>
			ORDER NOW
		</button>
	</div>
)

export default BuildControls
