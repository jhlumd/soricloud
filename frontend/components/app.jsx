import React from "react";
import { Route, Switch } from "react-router-dom";

import Modal from "./modal/modal";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import SplashContainer from "../components/splash/splash_container";
import TrackIndex from "../components/tracks/track_index";
import UploadPage from "../components/upload/upload_page";
// import TrackPlayerContainer from "../components/track_player/track_player_container";
import TrackShowPageContainer from "../components/tracks/track_show_page_container";

const App = () => (
  <>
    <Modal />
    {/* <ProtectedRoute path="/" component={NavBar} /> */}
    <Switch>
      <ProtectedRoute path="/discover" component={TrackIndex} />
      <ProtectedRoute path="/upload" component={UploadPage} />
      <ProtectedRoute path="/tracks/:trackId" component={TrackShowPageContainer} />
      <AuthRoute path="/" component={SplashContainer} />
    </Switch>
    {/* <TrackPlayerContainer /> */}
  </>
);

export default App;
