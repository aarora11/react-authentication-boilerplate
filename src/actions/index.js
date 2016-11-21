import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';
import {} from './types';
const ROOT_URL = 'http://localhost:3090';


export function signInUser({email, password}) {
    return function (dispatch) {

        //Submit email password to server
      axios.post(`${ROOT_URL}/signin`, {email, password})
        //ES6 equivalent to
        // {email : email,
        // password : password}
          .then(response => {
              //If request is good -- update state to indicate user is authenticated
              dispatch({type: AUTH_USER});
              //Save JWT token
              localStorage.setItem('token', response.data.token);
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
        axios.post(`${ROOT_URL}/signUp`, {email, password}).then(response =>{
            console.log("inside then", response.data);
            dispatch({type : AUTH_USER});
            localStorage.setItem('token', response.data.token);
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
            headers: {authorization : localStorage.getItem('token')}
        }).then(response =>{
           dispatch({
               type: FETCH_MESSAGE,
               payload: response.data.message
           });

        })  ;
    }
}
