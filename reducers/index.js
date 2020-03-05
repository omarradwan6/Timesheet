
import { combineReducers } from 'redux';
import newUserReducer from './newUserReducer';
import activitiesReducer from './activitiesReducer';
import adjustmentsReducer from './adjustmentsReducer';
import createSheetReducer from './createSheetReducer';
import monthDataReducer from './monthDataReducer';
import createPreviewReducer from './createPreviewReducer';
import checkModeReducer from './checkModeReducer';
import blockTimsheetReducer from './blockTimsheetReducer';
import changePageReducer from './changePageReducer';

export default combineReducers({
	newUser: newUserReducer,
	Activities: activitiesReducer,
	adjustments: adjustmentsReducer,
	createSheet: createSheetReducer,
	monthData: monthDataReducer,
	createPreview: createPreviewReducer,
	checkMode: checkModeReducer,
	blockTimesheet: blockTimsheetReducer,
	currentPage:changePageReducer
})