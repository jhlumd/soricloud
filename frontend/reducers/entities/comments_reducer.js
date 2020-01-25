import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  CLEAR_COMMENTS
} from "../../actions/comment_actions";
import { merge } from "lodash";

const commentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_COMMENTS:
      newState = {};
      action.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return merge({}, oldState, newState);
    case RECEIVE_COMMENT:
      newState = { [action.comment.id]: action.comment };
      return merge({}, oldState, newState);
    case REMOVE_COMMENT:
      newState = merge({}, oldState);
      delete newState[action.comment.id];
      return newState;
    case CLEAR_COMMENTS:
      return {};
    default:
      return oldState;
  }
};

export default commentsReducer;
