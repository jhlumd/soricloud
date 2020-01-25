import React from "react";
import { Route, Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Modal from "./modal/modal";
import SplashC from "../components/splash/splash_container";
import DiscoverC from "../components/splash/discover_container";
import UploadPage from "../components/upload/upload_page";
import TrackShowPageC from "../components/tracks/track_show_page_container";
import NavBarC from "../components/navbar/nav_bar_container";
import UserShowC from "../components/users/user_show_container";

const App = () => (
  <>
    <Modal />
    <Route path="/" component={NavBarC} />
    <Switch>
      <ProtectedRoute path="/upload" component={UploadPage} />
      <Route path="/users/:userId" component={UserShowC} />
      <Route path="/tracks/:trackId" component={TrackShowPageC} />
      <Route path="/discover" component={DiscoverC} />
      <AuthRoute path="/" component={SplashC} />
    </Switch>
  </>
);

export default App;
