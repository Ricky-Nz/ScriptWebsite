/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import { useState, scriptState, folderState, packageState, parameterState, reportState } from './state-reducer';
import { scripts, folders, packages, parameters, reports } from './arraydata-reducer';
import { user } from './user-reducer';

const rootReducer = combineReducers({
    useState,
    scriptState,
    folderState,
    packageState,
    parameterState,
    reportState,
    scripts,
    folders,
    packages,
    parameters,
    reports,
    user
});

export default rootReducer;