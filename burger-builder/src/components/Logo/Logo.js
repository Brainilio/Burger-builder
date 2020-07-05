import React from "react"
import Image from "../../assets/burger-logo.png"
import classes from "./Logo.module.css"

const Logo = () => (
	<div className={classes.Logo}>
		<img src={Image} alt='logo' />
	</div>
)

export default Logo
