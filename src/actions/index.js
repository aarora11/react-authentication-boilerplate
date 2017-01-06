import axios from 'axios';
import {browserHistory} from 'react-router';

import {AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
    QUOTE,
    MATCHES
} from './types';
import {} from './types';
const ROOT_URL = 'http://localhost:3090';
const TEMP_ROOT_URL = 'http://localhost:8000/Test/webresources/authenticate';
var querystring = require('querystring');




export function signInUser({email, password}) {
    return function (dispatch) {
        
        //Submit email password to server
      axios.post(`${TEMP_ROOT_URL}`, querystring.stringify({
            email: email,
            password: password,
            
    }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
      } 
    })
        //ES6 equivalent to
        // {email : email,
        // password : password}
          .then(response => {
              //If request is good -- update state to indicate user is authenticated
              dispatch({type: AUTH_USER});
              //Save JWT token
              localStorage.setItem('token', response.data);
              //redirect to /feature
            browserHistory.push('/feature');
          })
          .catch(()=>{
              //if request is bad then show an error to the user
              dispatch(authError("Bad login info"));
          });
    }
}

export function signUpUser({email,password}){
    return function (dispatch) {
        axios.post(`${TEMP_ROOT_URL}/signUp`, querystring.stringify({
            email: email,
            password: password,
            
    }),{
            headers: {
               'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(response =>{
            
            dispatch({type : AUTH_USER});
            localStorage.setItem('token', response.data);
            browserHistory.push('/feature');
        }).catch((errorObj)=>{
            dispatch(authError(errorObj.response.data.error));
        });
    }
}

export  function signOutUser() {
    localStorage.removeItem('token');
    return {
        type : UNAUTH_USER
    };
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL,{
            headers: {authorization : "Bearer".concat(localStorage.getItem('token'))}
        }).then(response =>{
           dispatch({
               type: FETCH_MESSAGE,
               payload: response.data.message
           });

        })  ;
    }
}


export function fetchQuote(){
 
    return function(dispatch){
        var d = new Date();
        var n = d.getTime();
        axios.get(`http://localhost:8000/Test/webresources/dashboard`, {
            headers: {
               authorization : "Bearer".concat(localStorage.getItem('token'))

        }}).then(response=>{
            console.log("Quote --- ", response);
            dispatch({
                type : QUOTE,
                payload: response.data
            });

        });
    }
}


export function fetchMatches(){
    var config = {
  headers: {'apikey': 'qG1KVIL2x6XVXdgkP03p2TCIqCg1 '}
};
    return function(dispatch){
        axios.get(`http://cricapi.com/api/matches/`, config).then(response=>{
            console.log("Matches data", response.data);
            dispatch({
                type: MATCHES,
                payload: response.data.message
            });
        });
    }
}
