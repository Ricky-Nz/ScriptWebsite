/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import { mainDatas, secondaryDatas, script } from './data-reducer';
import { app, dialog, mainState, secondaryState } from './state-reducer';

const rootReducer = combineReducers({
    app,
    dialog,
    mainDatas,
    mainState,
    secondaryDatas,
    secondaryState,
    script
});

export default rootReducer;