import React from "react"
import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop"

const modal = (props) => (
	<>
		<Backdrop show={props.show} clicked={props.modalClosed} />
		<div
			style={{
				// If show is true, show the modal, if not then move it outside of the screen
				// also add the opacity to it, this is an object so you can take advantage of it
				transform: props.show ? "translateY(0)" : "translateY(-100vh)",
				opacity: props.show ? "1" : "0",
			}}
			className={classes.Modal}
		>
			{props.children}
		</div>
	</>
)

export default modal
