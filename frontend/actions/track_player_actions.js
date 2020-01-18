export const PLAY_MUSIC = "PLAY_MUSIC";
export const PAUSE_MUSIC = "PAUSE_MUSIC";
export const RECEIVE_TRACK_INFO = "RECEIVE_TRACK_INFO";
export const UPDATE_CURRENT_TIME = "UPDATE_CURRENT_TIME";
export const SEEK_PERCENTAGE = "SEEK_PERCENTAGE";
export const CLEAR_SEEK_PERCENTAGE = "CLEAR_SEEK_PERCENTAGE";

export const playMusic = () => ({ type: PLAY_MUSIC });

export const pauseMusic = () => ({ type: PAUSE_MUSIC });

export const receiveTrackInfo = trackInfo => ({
  type: RECEIVE_TRACK_INFO,
  trackInfo
});

export const updateCurrentTime = currentTime => ({
  type: UPDATE_CURRENT_TIME,
  currentTime
});

export const seekPercentage = newPercentage => ({
  type: SEEK_PERCENTAGE,
  newPercentage
});

export const clearSeekPercentage = () => ({ type: CLEAR_SEEK_PERCENTAGE });
