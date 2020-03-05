 const INITIAL = {
	 mode: null, 
	 empSign: 0,
	 supSign: 0, 
	 locked: 0
}

export default (state = { INITIAL }, action) => {

	if (action.type === 'CHECK_MODE') {
		return {
			...state,
			mode: action.mode,
			empSign: action.empSign,
			supSign: action.supSign,
			locked: action.locked
		}
	}
	
	return state
}


