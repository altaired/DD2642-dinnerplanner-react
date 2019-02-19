import {
    ADD_TO_MENU,
    CLEAR_MENU
} from '../actions/types';

let initialState = {
    items: []
}

const persistedState = localStorage.getItem('menu')

// if persistedState is not empty then assign parsed persistedState to initState
if (persistedState) {
    initialState = {
        items: JSON.parse(persistedState)
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_MENU:
            let newMenu;
            if (state.items.find(dish => dish.id === action.payload.id)) {
                newMenu = state.items;
            } else {
                newMenu = [...state.items, action.payload];
            }
            window.localStorage.setItem('menu', JSON.stringify(newMenu));
            return {
                ...state,
                items: newMenu
            };

        case CLEAR_MENU:
            window.localStorage.removeItem('menu');
            return {
                ...state,
                items: []
            }

        default:
            return state;
    }
}