import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

//nav items
import NavigationItems from "./NavigationItems"
import NavigationItem from "./NavigationItem/NavigationItem"

configure({ adapter: new Adapter() })

//describe test
describe("Navigation Items", () => {
	it("Should render 2 nav items if not authenticated", () => {
		const wrapper = shallow(<NavigationItems />)
		expect(wrapper.find(NavigationItem)).toHaveLength(2)
	})
})
