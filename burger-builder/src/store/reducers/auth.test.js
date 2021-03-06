import reducer from "./auth"
import * as actionTypes from "../actions/actionTypes"

describe("auth reducer", () => {
	it("Get initial state if we get no value passed", () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: "/",
		})
	})

	it("should store token upon login", () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: "/",
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: "some-token",
					userId: "some-user-id",
				}
			)
		).toEqual({
			token: "some-token",
			userId: "some-user-id",
			error: null,
			loading: false,
			authRedirectPath: "/",
		})
	})

	it("should set redirect path", () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: "/",
				},
				{
					type: actionTypes.SETH_AUTH_REDIRECT_PATH,
					path: "/path",
				}
			)
		).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: "/path",
		})
	})
})
