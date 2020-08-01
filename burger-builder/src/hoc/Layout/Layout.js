import React, { Component } from "react"
import { connect } from "react-redux"
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
	// Wrap the content in a higher order component

	state = {
		showSideDrawer: false,
	}
	//SIDEDRAWERCLOSEDHANDLER
	SideDrawerHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer }
		})
	}
	render() {
		return (
			<>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					handleSide={this.SideDrawerHandler}
				/>
				<SideDrawer
					//side drawer open or not
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.SideDrawerHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStateToProps, null)(Layout)
