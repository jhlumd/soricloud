import React from "react";
import { Route, Switch } from "react-router-dom";

import Modal from "./modal/modal";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SplashC from "../components/splash/splash_container";
import TrackIndex from "../components/tracks/track_index";
import UploadPage from "../components/upload/upload_page";
import TrackShowPageC from "../components/tracks/track_show_page_container";
import NavBarC from "../components/navbar/nav_bar_container";

const App = () => (
  <>
    <Modal />
    <Route path="/" component={NavBarC} />
    <Switch>
      <Route path="/discover" component={TrackIndex} />
      <ProtectedRoute path="/upload" component={UploadPage} />
      <Route path="/tracks/:trackId" component={TrackShowPageC} />
      <AuthRoute path="/" component={SplashC} />
    </Switch>
  </>
);

export default App;
