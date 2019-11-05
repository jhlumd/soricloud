import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// import { signup, login, logout} from './util/session_api_util';
// import {
//     receiveCurrentUser,
//     logoutCurrentUser,
//     receiveErrors
// } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const store = configureStore();

    // window.signup = signup;
    // window.login = login;
    // window.logout = logout;
    
    // window.receiveCurrentUser = receiveCurrentUser;
    // window.logoutCurrentUser = logoutCurrentUser;
    // window.receiveErrors = receiveErrors;
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;

    ReactDOM.render(<Root store={store} />, root);
});
