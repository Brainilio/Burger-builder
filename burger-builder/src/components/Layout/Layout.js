import React, { Component } from "react"
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
	// Wrap the content in a higher order component

	state = {
		showSideDrawer: true,
	}
	//SIDEDRAWERCLOSEDHANDLER
	SideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false })
	}
	render() {
		return (
			<>
				<Toolbar />
				<SideDrawer
					//side drawer open or not
					open={this.state.showSideDrawer}
					closed={this.SideDrawerClosedHandler}
				/>	
				<main className={classes.Content}>{this.props.children}</main>
			</>
		)
	}
}

export default Layout
