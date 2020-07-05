import React from "react"
import Logo from "../../UI/Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Backdrop from "../../UI/Backdrop/Backdrop"
import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
	//TODO: ADD CONDITIONAL
	let attachedClasses = [classes.SideDrawer, classes.Close]

	if (props.open) {
		console.log("open")
		attachedClasses = [classes.SideDrawer, classes.Open]
	}

	return (
		<>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</>
	)
}

export default SideDrawer
