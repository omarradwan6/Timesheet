



export const createUser = (name, id, department, description, sup1ID, sup2ID, networkID, sup1Name,
	sup2Name, departmentName, status) => {
	return {
		type: 'CREATE_USER',
		name: name,
		id: id,
		department: department,
		description: description,
		sup1ID: sup1ID, 
		sup2ID: sup2ID,
		networkID: networkID,
		sup1Name: sup1Name,
		sup2Name: sup2Name,
		departmentName: departmentName,
		status: status
	}
}

export const userActivities = (activities, totalHours, zeroRow) => {

	return {
		type: 'USER_ACTIVITIES',
		activities: activities,
		totalHours: totalHours,
		zeroRow: zeroRow
	}

}

export const createSheet = (month, year) => {

	return {
		type: 'CREATE_SHEET',
		month: month,
		year: year
	}

}

export const add_adjustments = (adjustments) => {

	return {
		type: 'ADD_ADJUSTMENTS',
		adjustments: adjustments
	}

}

export const monthData = (monthHours) => {

	return {
		type: 'MONTH_DATA',
		monthHours: monthHours
	}

}

export const createPreview = (month, year) => {

	return {
		type: 'CREATE_PREVIEW',
		month: month,
		year: year
	}

}

export const checkMode = (mode, empSign, supSign, locked) => {

	return {
		type: 'CHECK_MODE',
		mode: mode,
		empSign: empSign,
		supSign: supSign,
		locked: locked
	}

}

export const updateActivities = (updated) => {

	return {
		type: 'UPDATE_ACTIVITIES',
		updated: updated
	}

}

export const updatePenalty = (updatePenalty) => {

	return {
		type: 'UPDATE_PENALTY',
		updatePenalty: updatePenalty
	}

}


export const blockPage = (blockPage) => {

	return {
		type: 'Blocking',
		blockPage: blockPage
	}

}

export const saveStatus = (saved) => {

	return {
		type: 'SAVE_STATUS',
		saved: saved
	}

}


export const changePage = (page) => {

	return {
		type: 'PAGE_CHANGE',
		page: page
	}

}
