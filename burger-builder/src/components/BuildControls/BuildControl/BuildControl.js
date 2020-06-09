import React from "react"
import classes from "./BuildControl.module.css"

//single control button that shows 1 ingredient and gives option to add or remove ingredient
const buildControl = (props) => (
	<div className={classes.BuildControl}>
		<div className={classes.Label}>{props.label}</div>
		<button
			className={classes.Less}
			onClick={props.removed}
			disabled={props.disabled} //check if disabled is true or not
		>
			Less
		</button>
		<button className={classes.More} onClick={props.added}>
			More
		</button>
	</div>
)

export default buildControl
