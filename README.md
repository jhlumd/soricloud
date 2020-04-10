# <a href="https://soricloud.herokuapp.com/"><img src="./demo/logo.png" alt="SoundCloud Logo" title="Go to SoriCloud" height="55" align="center"></a> SoriCloud - A SoundCloud Clone
> [SoriCloud](https://soricloud.herokuapp.com/ "Go to SoriCloud") is a single-page app for streaming music and uploading your own.

## Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
  * [Continuous audio playback through navigation](#continuous-audio-playback-through-navigation)
  * [Interactive waveform synced with music player bar](#interactive-waveform-synced-with-music-player-bar)
  * [Unique signup/login flow](#unique-signuplogin-flow)
  <!-- * [Easy audio upload with responsive and intuitive UI](#easy-audio-upload-with-responsive-and-intuitive-ui) -->
* [Future Directions](#future-directions)
* [Contact](#contact)

## General Info
From the classic waveform visualizations to the intuitive interface for uploading your own music, SoriCloud recreates the signature look of the original website and many of its functionalities. The overarching theme is ease of access to share your music with the rest of the world that originally captured the hearts of grassroots musicians and bedroom producers.

Working on this clone of SoundCloud has been a source of continued learning. It's given me experience and valuable insights into full stack development.

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
An in-depth discussion of select features including details of my implementations and challenges faced:

---

### Continuous audio playback through navigation
Users can navigate to different pages within the website without interrupting the currently playing track. Clicking the play button on a different track stops the current playback before starting the new one preventing overlap.

Uninterrupted and non-overlapping playback is demonstrated in the screen recording below by the steady progress of the `SeekBar` and timestamp in the music player bar interface docked at the bottom of the view as well as on the `Waveform`s.

![Example screenshot](./demo/continuous_play.gif)

To enable this feature, I created a `currentTrack` slice of global Redux UI state to maintain "a single source of truth" for the currently playing track. With a correctly designed Redux pattern, the `currentTrack` will now only be able to be changed using the specific `receiveCurrentTrack` action. This allows all of the components at any given page throughout navigation to know the correct currently playing track and update themselves when a new playback is started or to stay put for continuous playback, accordingly.

Biggest challenge here was understanding which components should be subscribed to this slice of global Redux state. For example, compared to the `Waveform`s, it was less obvious that the `TrackIndexItem`s on the `Discover` page should also be subscribed in order to correctly display the *pause* button over the track image if it was the currently playing track.

```javascript
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

### Interactive waveform synced with music player bar
Users can click on either the `SeekBar` of the music player bar or the `Waveform` of a currently playing track to seek to the corresponding timestamp. When one is clicked, the other is automatically updated in sync. The UI is responsive and intuitive, and the dynamic visual displays update smoothly in real-time as demonstrated below.

![Example screenshot](./demo/synced_waveform.gif)

First, I developed a `Waveform ` component to dynamically generate a customized waveform visualization for each track on `TrackShow` and `UserShow` pages.

Then, to facilitate the synchronization of the progress update on the waveform visual and the bottom music player bar, I designed a modular `SeekBar` component to be used as a subcomponent of all components that require the seek functionality. Implementing the modularity was the most challenging aspect. However, it made the synchronization of the two parts with Redux easier and more intuitive.

The following code is the part of the `SeekBar` component that modularly handles user input from three different sources - `TrackShowPage`'s larger waveform, `UserShowPage`'s smaller waveform, and the bottom music player bar. It calculates the new position in the audio playback using the `clientX` property of the input event and the knowledge of the input source.

```javascript
function handlePercentage(e) {
  const { seekBarStyle, seekPercentage } = this.props;
  const { offsetLeft, offsetWidth } = e.currentTarget;
  const xPos = (window.innerWidth - 1280) / 2;

  const multiplier =
    seekBarStyle === "long" ? 1.5 : seekBarStyle === "medium" ? 107 : 1.25;
      // "long" = TrackShowPage waveform
      // "medium" = UserShowPage waveform
      // default/undefined = music player bar
  const newPercentage = Math.floor(
    ((e.clientX - xPos - offsetLeft * multiplier) / offsetWidth) * 100
  );
  seekPercentage(newPercentage); // dispatch the seekPercentage Redux action
}
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
Delve deep into features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions. Code snippets to highlight your best code.

![Example screenshot](./demo/signup.gif)

Show examples of usage:

```
sample code
```

---

## Future Directions
* Improve waveform visualization loading time.
* Display a loading icon while the audio upload form in submitting.
* Link comments to specific timestamps on tracks. Submitting a comments records the current timestamp of the track if it is currently playing, and clicking the timestamp on the comment starts playback of that track from the corresponding timestamp.
* Optimize rest of the SQL queries to eliminate remaining N+1.
* Add search, likes, follows, and playlists.

## Contact
Created by [Jaehyuk Lee](mailto:jhlumd@gmail.com) - feel free to contact me!