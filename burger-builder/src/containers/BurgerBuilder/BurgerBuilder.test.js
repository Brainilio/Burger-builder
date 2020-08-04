import { BurgerBuilder } from "./BurgerBuilder"
import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import BuildControls from "../../components/BuildControls/BuildControls"

configure({ adapter: new Adapter() })

describe("Burger Builder", () => {
	let wrapper
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder />)
	})
})
