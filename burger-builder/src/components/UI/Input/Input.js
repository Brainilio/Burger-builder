import React from "react"
import classes from "./Input.module.css"

const Input = (props) => {
	let inputElement = null

	switch (props.inputType) {
		case "input":
			inputElement = <input />
			break
		case "textarea":
			inputElement = <textarea />
			break
		default:
			inputElement = <input />
	}

	return <div></div>
}

export default Input
