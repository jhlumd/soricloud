import * as TrackAPIUtil from '../util/track_api_util';

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
  TrackAPIUtil.fetchAllTracks().then(tracks =>
    dispatch(receiveTracks(tracks))
  );

export const uploadTrack = formData => dispatch =>
  TrackAPIUtil.uploadTrack(formData).then(track =>
    dispatch(receiveTrack(track))
  );

export const fetchTrack = id => dispatch =>
  TrackAPIUtil.fetchTrack(id).then(track => dispatch(receiveTrack(track)));

export const updateTrack = formData => dispatch =>
  TrackAPIUtil.updateTrack(formData).then(track =>
    dispatch(receiveTrack(track))
  );

export const deleteTrack = id => dispatch =>
  TrackAPIUtil.deleteTrack(id).then(track => dispatch(removeTrack(track)));

export const fetchCurrentTrack = id => dispatch =>
  TrackAPIUtil.fetchTrack(id).then(payload =>
    dispatch(receiveCurrentTrack(payload))
  );
