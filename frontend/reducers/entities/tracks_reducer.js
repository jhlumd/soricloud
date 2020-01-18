import {
  RECEIVE_TRACK,
  RECEIVE_TRACKS,
  REMOVE_TRACK
} from "../../actions/track_actions";
import { RECEIVE_USER } from "../../actions/user_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { merge } from "lodash";

const tracksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_TRACKS:
      newState = {};
      action.tracks.forEach(track => {
        newState[track.id] = track;
      });
      return merge({}, oldState, newState);
    case RECEIVE_TRACK:
      newState = { [action.track.id]: action.track };
      return merge({}, oldState, newState);
    case REMOVE_TRACK:
      newState = merge({}, oldState);
      delete newState[action.id];
      return newState;
    case RECEIVE_USER:
      newState = {};
      action.tracks.forEach(track => {
        newState[track.id] = track;
      });
      return merge({}, oldState, newState);
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default tracksReducer;
