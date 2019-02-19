import {
    ADD_TO_MENU,
    CLEAR_MENU
} from './types';

export const addToMenu = dish => dispatch => {
    dispatch({
        type: ADD_TO_MENU,
        payload: dish
    })
}

export const clearMenu = () => dispatch => {
    dispatch({
        type: CLEAR_MENU
    })
}