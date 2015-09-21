/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import app from './appstate-reducer';
import folders from './folders-reducer';

const rootReducer = combineReducers({
    app,
    folders
});

export default rootReducer;