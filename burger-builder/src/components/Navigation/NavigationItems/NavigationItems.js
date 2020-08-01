import React from "react"
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" active={true}>
			Burger Builder
		</NavigationItem>
		<NavigationItem link="/orders">My Orders</NavigationItem>

		{props.isAuthenticated ? (
			<NavigationItem link="/logout">Logout</NavigationItem>
		) : (
			<NavigationItem link="/auth">Login</NavigationItem>
		)}
	</ul>
)

//isAuthenticated

export default NavigationItems
