import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

//nav items
import NavigationItems from "./NavigationItems"
import NavigationItem from "./NavigationItem/NavigationItem"

configure({ adapter: new Adapter() })

//describe test
describe("Navigation Items", () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />)
	})

	it("Should render 2 nav items if not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2)
	})

	it("Should render 3 nav items if authenticated", () => {
		//use setprops to set props to your wrappers
		wrapper.setProps({ isAuthenticated: true })
		expect(wrapper.find(NavigationItem)).toHaveLength(3)
	})
})
