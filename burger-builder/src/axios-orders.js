import axios from "axios"

const instance = axios.create({
	baseURL: "https://react-my-burger-builder-d060b.firebaseio.com/",
})

export default instance
