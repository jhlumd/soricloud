import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link
} from 'react-router-dom';

import SplashContainer from '../components/splash/splash_container';

import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <div>
        <Modal />
        <header>
            <Link to="/" className="header-link">
                <h1>SoriCloud</h1>
            </Link>
            <GreetingContainer />
        </header>
        <Switch>
            <AuthRoute path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App;
