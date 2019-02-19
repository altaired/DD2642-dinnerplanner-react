import {
    combineReducers
} from 'redux';

import dishReducer from './dishReducer';
import menuReducer from './menuReducer';
import guestReducer from './guestReducer';

export default combineReducers({
    dishes: dishReducer,
    menu: menuReducer,
    guests: guestReducer
});