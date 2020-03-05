const INITIAL = {
	blockPage: false,
}

export default (state = { INITIAL }, action) => {

	if (action.type === 'Blocking') {
		return {
			...state,
			blockPage: action.blockPage
		}
	}

	return state
}




