import React from "react"
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" active={true}>
			Burger Builder
		</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link="/orders">My Orders</NavigationItem>
		) : null}

		{props.isAuthenticated ? (
			<NavigationItem link="/logout">Logout</NavigationItem>
		) : (
			<NavigationItem link="/auth">Login</NavigationItem>
		)}
	</ul>
)

export default NavigationItems
