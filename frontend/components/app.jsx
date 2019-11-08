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
    <>
        < Modal />
        <Switch>
            {/* <Route exact path="/ping" component={Ping} /> */}
            <Route exact path="/" component={SplashContainer} />
            {/* <Route path="/" component={NavBar} /> */}
        </Switch>

        <Switch>
            {/* <Route exact path="/tracks/edit/:trackId" component={EditFormContainer} />
            <ProtectedRoute exact path="/tracks/new" component={CreateFormContainer} />
            <Route exact path="/tracks/:trackId" component={TrackShow} />
            <Route exact path="/tracks" component={TrackIndex} />
            <Route exact path="/users/:userId" component={UserShow} /> */}
        </Switch>
        {/* < MusicBar /> */}
    </>
);

export default App;
