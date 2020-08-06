import React, { useState } from "react"
import { connect } from "react-redux"
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

const Layout = (props) => {
	// Wrap the content in a higher order component
	const [showSideDrawer, setShowSideDrawer] = useState(false)

	//SIDEDRAWERCLOSEDHANDLER
	const SideDrawerHandler = () => {
		setShowSideDrawer((prevState) => !prevState)
	}

	return (
		<>
			<Toolbar isAuth={props.isAuthenticated} handleSide={SideDrawerHandler} />
			<SideDrawer
				//side drawer open or not
				isAuth={props.isAuthenticated}
				open={showSideDrawer}
				closed={SideDrawerHandler}
			/>
			<main className={classes.Content}>{props.children}</main>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStateToProps, null)(Layout)
