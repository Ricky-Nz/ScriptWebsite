/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import arrayData from './arraydata-reducer';
import detail from './scriptdetail-reducer'; 
import user from './user-reducer';
import dialog from './dialog-reducer';

const rootReducer = combineReducers({
    user,
    arrayData,
    detail,
    dialog
});

export default rootReducer;