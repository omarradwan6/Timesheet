const INITIAL = {
	name: null,
	id: null, 
	department: null,
	description: null,
	sup1ID: null,
	sup2ID: null,
	networkID: null,
	sup1Name: null,
	sup2Name: null,
	departmentName: null,
	status: "loged-out"
}

export default (state = { INITIAL }, action) => {

	if (action.type === 'CREATE_USER') {
		return {
			...state,
			name: action.name,
			id: action.id,
			department: action.department,
			description: action.description,
			sup1ID: action.sup1ID,
			sup2ID: action.sup2ID,
			networkID: action.networkID,
			sup1Name: action.sup1Name,
			sup2Name: action.sup2Name,
			departmentName: action.departmentName,
			status: action.status
		}
	}
	
	return state
}


