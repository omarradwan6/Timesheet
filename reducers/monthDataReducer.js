const INITIAL = {
	activities: null
}
export default (state = { INITIAL }, action) => {

	if (action.type === 'MONTH_DATA') {
		return {
			...state,
			monthHours: action.monthHours
		}
	}
	return state
}