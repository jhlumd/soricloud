import * as APIUtil from "../util/comment_api_util";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

export const clearComments = () => ({
  type: CLEAR_COMMENTS
});

export const fetchComments = trackId => dispatch =>
  APIUtil.fetchComments(trackId).then(res => dispatch(receiveComments(res)));

export const createComment = comment => dispatch =>
  APIUtil.createComment(comment).then(res => dispatch(receiveComment(res)));

export const deleteComment = id => dispatch =>
  APIUtil.deleteComment(id).then(res => dispatch(removeComment(res)));
