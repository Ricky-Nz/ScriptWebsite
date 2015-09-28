/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import { folders, packages, parameters, reports, searchResults } from './data-reducer';
import { app, dialog, foldersPanel, packagesPanel, parametersPanel, reportsPanel } from './state-reducer';

const rootReducer = combineReducers({
    app,
    dialog,
    foldersPanel,
    packagesPanel,
    parametersPanel,
    reportsPanel,

    folders,
    packages,
    parameters,
    reports,
    searchResults
});

export default rootReducer;