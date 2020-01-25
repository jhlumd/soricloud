import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = ({ user, tracks }) => ({
  type: RECEIVE_USER,
  user,
  tracks
});

export const fetchUser = id => dispatch =>
  APIUtil.fetchUser(id).then(res => dispatch(receiveUser(res)));

export const updateUser = (formData, userId) => dispatch =>
  APIUtil.updateUser(formData, userId).then(res => dispatch(receiveUser(res)));
