import { combineReducers } from "redux";
import users from "./entities/users_reducer";
import tracks from "./entities/tracks_reducer";
import comments from "./entities/comments_reducer";

const entitiesReducer = combineReducers({
  users,
  tracks,
  comments
});

export default entitiesReducer;
