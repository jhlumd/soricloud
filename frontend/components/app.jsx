import React from 'react';
import { Route, Redirect, Switch, Link } from "react-router-dom";

import Modal from './modal/modal';
import SplashContainer from '../components/splash/splash_container';
import TrackIndex from '../components/tracks/track_index';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <>
        < Modal />
        {/* <ProtectedRoute path="/" component={NavBar} /> */}
        <Switch>
            <Route path="/tracks" component={TrackIndex} />
            <Route path="/" component={SplashContainer} />
        </Switch>
        {/* < MusicBar /> */}
    </>
);

export default App;
