import { combineReducers } from "redux";

import usersReducer from "./entities/users_reducer";
import tracksReducer from "./entities/tracks_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  tracks: tracksReducer
});

export default entitiesReducer;
