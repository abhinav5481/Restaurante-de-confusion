//this can be deleted once we have seperated the dishes comments promotions and leaders to seperate files

export const initialState = {
    dishes : DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
}

export const Reducer = (state = initialState, action) => {
    return state;
}