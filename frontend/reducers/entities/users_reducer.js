import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "../../actions/session_actions";
import { RECEIVE_USER } from "../../actions/user_actions";
import { RECEIVE_TRACK } from "../../actions/track_actions";
import { merge } from "lodash";

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = { [action.currentUser.id]: action.currentUser };
      return merge({}, oldState, newState);
    case LOGOUT_CURRENT_USER:
      return {};
    case RECEIVE_USER:
      newState = { [action.user.id]: action.user };
      return merge({}, oldState, newState);
    case RECEIVE_TRACK:
      newState = { [action.user.id]: action.user };
      return merge({}, oldState, newState);
    default:
      return oldState;
  }
};

export default usersReducer;
