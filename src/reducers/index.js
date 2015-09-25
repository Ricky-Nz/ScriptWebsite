/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import user from './users-reducer';
import folders from './folders-reducer';

const rootReducer = combineReducers({
    user,
    folders
});

export default rootReducer;