import {
    FETCHED_DISH,
    FETCHED_DISHES,
    REQUEST_DISH,
    REQUEST_DISHES
} from './types';

export const requestDishes = () => dispatch => {
    dispatch(fetchDishes());
    dispatch({
        type: REQUEST_DISHES,
        status: 'success'
    })
}

export const requestDish = id => dispatch => {
    dispatch(fetchDish(id));
    dispatch({
        type: REQUEST_DISH,
        status: 'success'
    })
}

export const fetchDishes = () => dispatch => {
    const type = 'main dish';
    const query = 'burger';
    const nbrItems = 50;
    fetch(`http://sunset.nada.kth.se:8080/iprog/group/50/recipes/search?type="${type}"&query="${query}"&number=${nbrItems}`, {
            headers: {
                'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
            }
        })
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCHED_DISHES,
            payload: data.results,
            status: 'success'
        })).catch(error => dispatch({
            type: FETCHED_DISHES,
            status: 'error',
            error: error
        }));
}

export const fetchDish = id => dispatch => {
    fetch(`http://sunset.nada.kth.se:8080/iprog/group/50/recipes/${id}/information`, {
            headers: {
                'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
            }
        })
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCHED_DISH,
            payload: data,
            status: 'success'
        })).catch(error => dispatch({
            type: FETCHED_DISH,
            status: 'error',
            error: error
        }));
}