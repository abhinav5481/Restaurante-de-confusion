import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});


//for dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    //this was for simulating the server fetch
    // setTimeout( () => {
    //     dispatch(addDishes(DISHES));
    // },2000);

    // Here we are using actual Fetch api
    return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error '+response.status+' : '+response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
    var errmess = new Error(error.message)
    throw errmess;
    }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg
});


export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});



//for comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')

    //The first part is when you receive a response from the server and the second part is 
    //for the time when you do not receive the response at all
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error '+response.status+' : '+response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
    var errmess = new Error(error.message)
    throw errmess;
    }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch( error => dispatch(commentsFailed(error.message)))
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
});


//for promos
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    //this was for simulating the server fetch
    // setTimeout( () => {
    //     dispatch(addDishes(DISHES));
    // },2000);

    // Here we are using actual Fetch api
    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error '+response.status+' : '+response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
    var errmess = new Error(error.message)
    throw errmess;
    }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg
});


export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

