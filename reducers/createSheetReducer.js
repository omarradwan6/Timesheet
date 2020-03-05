const INITIAL = {
	month: null,
	year: null
}

export default (state = { INITIAL }, action) => {

	if (action.type === 'CREATE_SHEET') {
		return {
			...state,
			month: action.month,
			year: action.year
		}
	}
	
	return state
}


