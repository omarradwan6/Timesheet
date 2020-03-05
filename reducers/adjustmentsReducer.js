const INITIAL = {
	adjustments: []
}

export default (state = { INITIAL }, action) => {

	if (action.type === "ADD_ADJUSTMENTS") {
		var newstate = { ...state, adjustments: action.adjustments }
		return newstate
	}

	return state


}