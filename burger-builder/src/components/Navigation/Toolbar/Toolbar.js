import React from "react"
import Logo from "../../UI/Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./Toolbar.module.css"

const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			{/* Hamburger icon */}
			<div className={classes.Menu} onClick={props.handleSide}>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<div className={classes.Logo}>
				<Logo />
			</div>

			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</header>
	)
}

export default Toolbar
