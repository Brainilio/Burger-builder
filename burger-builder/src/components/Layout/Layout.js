import React from "react"
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

const layout = (props) => (
	// Wrap the content in a higher order component
	<>
		<Toolbar />
		<SideDrawer />
		<main className={classes.Content}>{props.children}</main>
	</>
)

export default layout
