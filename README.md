# <a href="https://soricloud.herokuapp.com/"><img src="./demo/logo.png" alt="SoundCloud Logo" title="Go to SoriCloud" height="55" align="center"></a> SoriCloud - A SoundCloud Clone
> [SoriCloud](https://soricloud.herokuapp.com/ "Go to SoriCloud") is a single-page app for streaming music and uploading your own.

## Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
  * [Continuous audio playback through navigation](#continuous-audio-playback-through-navigation)
  * [Interactive waveform synced with music player](#interactive-waveform-synced-with-music-player)
  * [Unique signup/login flow](#unique-signuplogin-flow)
  <!-- * [Easy audio upload with responsive and intuitive UI](#easy-audio-upload-with-responsive-and-intuitive-ui) -->
* [Future Directions](#future-directions)
* [Contact](#contact)

## General Info
Working on this clone of SoundCloud has been a source of continued learning. It's given me experience and valuable insights into full stack development.

From the classic waveform visualizations to the intuitive interface for uploading your own music, SoriCloud recreates the signature look of the original website and many of its functionalities.

The overarching theme is the ease of access to sharing your music with the rest of the world that originally captured the hearts of grassroots musicians and bedroom producers.

## Technologies
* React - v16.11.0
* Redux - v4.0.4
* Rails - v5.2.3
* PostgreSQL - v12.2
* AWS S3
* Webpack - v4.41.2
* React Router - v5.1.2
* Ruby v2.5.1
  * jQuery Rails - v4.3.5
  * Jbuilder - v2.5
  * BCrypt - v3.1.7

## Features
In-depth explanations of some notable features and the details of my implementation and challenges faced:

---

### Continuous audio playback through navigation
Users can navigate to different pages within the website without interrupting the currently playing track. Clicking the play button on a different track stops the current playback before starting the new one preventing overlap.

Uninterrupted and non-overlapping playback is demonstrated in the screen recording below by the steady progress of the SeekBar and timestamp in the music player interface docked at the bottom of the view as well as on the waveforms.

![Example screenshot](./demo/continuous_play.gif)

To enable this feature, I created a `currentTrack` slice of global Redux UI state to maintain "a single source of truth" for the currently playing track. With a correctly designed Redux pattern, the `currentTrack` will now only be able to be changed using the specific `receiveCurrentTrack` action. This allows all of the components at any given page throughout navigation to know what the currently playing track is and update themselves when a new playback is started or to stay put for continuous playback, accordingly.


```
// extracted from track_actions.js
const receiveCurrentTrack = ({ track, user }) => ({
  type: RECEIVE_CURRENT_TRACK,
  currentTrack: track,
  user
});

// extracted from current_track_reducer.js
switch (action.type) {
  case RECEIVE_CURRENT_TRACK:
    const userInfo = { username: action.user.username };
    const newState = merge({}, action.currentTrack, userInfo);
    return newState;

// extracted from ui_reducer.js
const uiReducer = combineReducers({
  modal: modalReducer,
  currentTrack: currentTrackReducer,
  trackPlayer: trackPlayerReducer
});
```

---

### Interactive waveform synced with music player
Delve deep into features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions. Code snippets to highlight your best code.

![Example screenshot](./demo/synced_waveform.gif)
Show examples of usage:
```
sample code
```

---
<!-- fixme - add easy upload screenshot after adding loading icon
### Easy upload with responsive and intuitive UI
Delve deep into features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions. Code snippets to highlight your best code.

![Example screenshot](./demo/screenshot.png)

Show examples of usage:

```
sample code
``` -->

### Unique signup/login flow
![Example screenshot](./demo/signup.gif)
Show examples of usage:
```
sample code
```

---

## Future Directions
* Display a loading icon while the audio upload form in submitting.
* Submitting a comments records the current timestamp of the track if it is currently playing, and clicking the timestamp on the comment starts playback of that track from the corresponding timestamp.
* Optimize rest of the SQL queries to eliminate remaining N+1.
* Search, likes, follows, playlists.

## Contact
Created by [Jaehyuk Lee](mailto:jhlumd@gmail.com) - feel free to contact me!