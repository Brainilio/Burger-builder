export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	}
}

//utility function to pass old state and add new properties for reducers
