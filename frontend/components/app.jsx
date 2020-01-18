import React from "react";
import { Route, Switch } from "react-router-dom";

import Modal from "./modal/modal";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import SplashC from "../components/splash/splash_container";
import TrackIndex from "../components/tracks/track_index";
import UploadPage from "../components/upload/upload_page";
import TrackPlayerC from "../components/track_player/track_player_container";
import TrackShowPageC from "../components/tracks/track_show_page_container";

const App = () => (
  <>
    <Modal />
    {/* <ProtectedRoute path="/" component={NavBar} /> */}
    <Switch>
      <Route path="/discover" component={TrackIndex} />
      <ProtectedRoute path="/upload" component={UploadPage} />
      <Route path="/tracks/:trackId" component={TrackShowPageC} />
      <AuthRoute path="/" component={SplashC} />
    </Switch>
    <TrackPlayerC />
  </>
);

export default App;
