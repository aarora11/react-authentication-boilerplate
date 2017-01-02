import {
    MATCHES
    } from '../actions/types';

export default function (state = {}, action) {
        switch (action.type){
        case MATCHES:
            return { ...state, matchList: action.payload};
       }
    return state;
}