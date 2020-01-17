import * as APIUtil from '../util/track_api_util';

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_CURRENT_TRACK = "RECEIVE_CURRENT_TRACK";

const receiveTracks = tracks => ({
  type: RECEIVE_TRACKS,
  tracks
});

// include comments later below
const receiveTrack = ({ track, user }) => ({
  type: RECEIVE_TRACK,
  track,
  user
});

const removeTrack = ({ id }) => ({
  type: REMOVE_TRACK,
  id
});

const receiveCurrentTrack = ({ track, user }) => ({
  type: RECEIVE_CURRENT_TRACK,
  currentTrack: track,
  user
});

export const fetchTracks = () => dispatch =>
  APIUtil.fetchAllTracks().then(tracks => dispatch(receiveTracks(tracks)));

export const uploadTrack = formData => dispatch =>
  APIUtil.uploadTrack(formData).then(track => dispatch(receiveTrack(track)));

export const fetchTrack = id => dispatch =>
  APIUtil.fetchTrack(id).then(track => dispatch(receiveTrack(track)));

export const updateTrack = formData => dispatch =>
  APIUtil.updateTrack(formData).then(track => dispatch(receiveTrack(track)));

export const deleteTrack = id => dispatch =>
  APIUtil.deleteTrack(id).then(track => dispatch(removeTrack(track)));

export const fetchCurrentTrack = id => dispatch =>
  APIUtil.fetchTrack(id).then(payload =>
    dispatch(receiveCurrentTrack(payload))
  );
