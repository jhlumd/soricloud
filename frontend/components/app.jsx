import React from 'react';
import { Route, Redirect, Switch, Link } from "react-router-dom";

import Modal from './modal/modal';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import SplashContainer from '../components/splash/splash_container';
import TrackIndex from '../components/tracks/track_index';
import UploadPage from '../components/upload/upload_page';

const App = () => (
  <>
    <Modal />
    {/* <ProtectedRoute path="/" component={NavBar} /> */}
    <Switch>
      <ProtectedRoute path="/upload" component={UploadPage} />
      <Route path="/discover" component={TrackIndex} />
      <AuthRoute path="/" component={SplashContainer} />
    </Switch>
  </>
);

export default App;
