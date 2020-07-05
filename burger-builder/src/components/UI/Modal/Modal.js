import React from "react"
import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop"
import { Component } from "react"

class Modal extends Component {
	//if show == true
	shouldComponentUpdate(nextProps, nextState) {
		//returns true if next props is not the same as this.props.show.
		return nextProps.show !== this.props.show
	}

	componentDidUpdate() {
		console.log("Modal updated.")
	}
	render() {
		return (
			<>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					style={{
						// If show is true, show the modal, if not then move it outside of the screen
						// also add the opacity to it, this is an object so you can take advantage of it
						transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
						opacity: this.props.show ? "1" : "0",
					}}
					className={classes.Modal}
				>
					{this.props.children}
				</div>
			</>
		)
	}
}

export default Modal
