import {
    CHANGE_GUESTS
} from '../actions/types';

const persistedState = localStorage.getItem('guests')

const initialState = {
    nbr: JSON.parse(persistedState)
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_GUESTS:
            window.localStorage.setItem('guests', JSON.stringify(action.guests));
            return {
                nbr: action.guests
            }

        default:
            return state;
    }
}