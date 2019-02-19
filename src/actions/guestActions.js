import {
    CHANGE_GUESTS
} from './types';

export const changeGuests = nbr => dispatch => {
    dispatch({
        type: CHANGE_GUESTS,
        guests: nbr
    })
}