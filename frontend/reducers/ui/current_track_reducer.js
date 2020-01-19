import { RECEIVE_CURRENT_TRACK } from "../../actions/track_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { merge } from "lodash";

const currentTrackReducer = (oldState = null, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_TRACK:
      const userInfo = { username: action.user.username };
      const newState = merge({}, action.currentTrack, userInfo);
      return newState;
    case LOGOUT_CURRENT_USER:
      return null;
    default:
      return oldState;
  }
};

export default currentTrackReducer;
