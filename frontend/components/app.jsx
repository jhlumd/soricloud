import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link
} from 'react-router-dom';

import Modal from './modal/modal';
import SplashContainer from '../components/splash/splash_container';

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <>
        < Modal />

        <Switch>
            <Route exact path="/" component={SplashContainer} />
            {/* <ProtectedRoute path="/" component={NavBar} /> */}
        </Switch>

        <Switch>
            {/* <Route exact path="/tracks" component={TrackIndex} /> */}
        </Switch>

        {/* < MusicBar /> */}
    </>
);

export default App;
