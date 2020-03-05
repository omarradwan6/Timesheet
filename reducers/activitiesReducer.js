const INITIAL = {
	activities: null,
	updated: false,
	updatePenalty: false,
	saved: false,
	zeroRow: false
}
export default (state = { INITIAL }, action) => {

	if (action.type === 'USER_ACTIVITIES') {
		return {
			...state,
			activities: action.activities,
			totalHours: action.totalHours,
			zeroRow: action.zeroRow
		}
	}

	if (action.type === 'UPDATE_ACTIVITIES') {
		return {
			...state,
			updated: action.updated
		}
	}

	if (action.type === 'UPDATE_PENALTY') {
		return {
			...state,
			updatePenalty: action.updatePenalty
		}
	}

	if (action.type === 'SAVE_STATUS') {
		return {
			...state,
			saved: action.saved
		}
	}

	return state
}