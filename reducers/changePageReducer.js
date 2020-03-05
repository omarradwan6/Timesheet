const INITIAL = {
	page: null
}

export default (state = { INITIAL }, action) => {

	if (action.type === "PAGE_CHANGE") {
		var newstate = { ...state, page: action.page }
		return newstate
	}

	return state


}