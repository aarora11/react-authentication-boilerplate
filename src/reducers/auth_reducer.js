import {AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
    QUOTE} from '../actions/types';

export default function (state = {}, action) {
        switch (action.type){
        case AUTH_USER:
            return { ...state, error: '', authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR :
            return {...state, error: action.payload};
        case FETCH_MESSAGE :
            return {...state, message: action.payload};
        case QUOTE:
            return {...state, quote: action.payload};    
    }
    return state;
}