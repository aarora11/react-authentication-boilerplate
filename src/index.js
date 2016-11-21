import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {AUTH_USER} from './actions/types';
import App from './components/app';
import SignOut from './components/auth/signOut';
import SignUp from './components/auth/signUp';
import reducers from './reducers';
import SignIn from './components/auth/signIn';
import Feature from './components/feature';
import reduxThunk from 'redux-thunk';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
//If Token is available consider user to be signed in

if(token){
    //we update the application state
    store.dispatch({
        type: AUTH_USER
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="signIn" component={SignIn}/>
                <Route path="signOut" component={SignOut}/>
                <Route path="signUp" component={SignUp} />
                <Route path="feature" component={RequireAuth(Feature)}/>
            </Route>
        </Router>
    </Provider>
    , document.querySelector('.container'));
