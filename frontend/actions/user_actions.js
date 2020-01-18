import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = ({ user, tracks }) => ({
  type: RECEIVE_USER,
  user,
  tracks
});

export const fetchUser = id => dispatch =>
  APIUtil.fetchUser(id).then(res => dispatch(receiveUser(res)));
