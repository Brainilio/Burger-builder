import React from "react"
import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop"

const Modal = (props) => {
	//if show == true
	// shouldComponentUpdate(nextProps, nextState) {
	// 	//returns true if next props is not the same as this.props.show.
	// 	return (
	// 		nextProps.show !== this.props.show ||
	// 		nextProps.children !== this.props.children
	// 	)
	// }

	return (
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
}

//optimized with memo, only updates if previous props is the same as the current props
export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
)
