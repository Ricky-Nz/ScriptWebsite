/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import { errorState, userState, scriptState, folderState, packageState, parameterState, reportState } from './querystate-reducer';
import { scripts, folders, packages, parameters, reports } from './querydata-reducer';
import { user } from './user-reducer';
import dialog from './dialogstate-reducer';
import dashboard from './dashboard-reducer';

const rootReducer = combineReducers({
    dashboard,
    dialog,

    scripts,
    folders,
    packages,
    parameters,
    reports,

    user,
    errorState,
    userState,

    scriptState,
    folderState,
    packageState,
    parameterState,
    reportState
});

export default rootReducer;