import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link
} from 'react-router-dom';

import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <div>
        <Modal />
        <header>
            <Link to="/" className="header-link">
                <h1>SoriCloud</h1>
            </Link>
            <GreetingContainer />
        </header>
        {/* <Switch>
            <ProtectedRoute exact path="/benches/new" component={BenchFormContainer} />
            <Route path="/benches/:benchId" component={BenchShowContainer} />
            <Route exact path="/" component={SearchContainer} />
        </Switch> */}
    </div>
);

export default App;
