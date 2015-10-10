/**
 * Created by ruiqili on 19/9/15.
 */
import { combineReducers } from 'redux';
import array from './array-reducer';
import select from './select-reducer';
import dialogSelect from './dialog-select-reducer';
import status from './status-reducer';
import tags from './tags-reducer';
import user from './user-reducer';
import versions from './versions-reducer';

const rootReducer = combineReducers({
    array,
    select,
    dialogSelect,
    status,
    tags,
    user,
    versions
});

export default rootReducer;