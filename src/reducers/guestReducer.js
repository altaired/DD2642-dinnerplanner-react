import {
    CHANGE_GUESTS
} from '../actions/types';

const initialState = {
    nbr: 1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_GUESTS:
            return {
                nbr: action.guests
            }

        default:
            return state;
    }
}