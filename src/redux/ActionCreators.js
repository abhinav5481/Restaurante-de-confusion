import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

//FOR POSTING COMMENTS
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });

}

//FOR POSTTING FEEDBACK
export const addFeedback = (feedback) => ({
    type: ActionTypes.POST_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email,agree ,contactType,message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .then(function (response) {
        alert('Thank you for your feedback! ' + JSON.stringify(response));
        return console.log(response)
    })
    .catch(error =>  { console.log('post Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });

}


//FOR FETCHING FEEDBACK




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

// FOR LEADERS
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    //this was for simulating the server fetch
    // setTimeout( () => {
    //     dispatch(addDishes(DISHES));
    // },2000);

    // Here we are using actual Fetch api
    return fetch(baseUrl + 'leaders')
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
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmsg
});


export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

