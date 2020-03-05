const INITIAL = {
	monthSelected: null,
	yearSelected: null
}

export default (state = { INITIAL }, action) => {

	if (action.type === 'CREATE_PREVIEW') {
		return {
			...state,
			monthSelected: action.month,
			yearSelected: action.year
		}
	}
	
	return state
}


