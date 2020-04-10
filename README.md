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

Uninterrupted and non-overlapping playback is demonstrated in the screen recording below by the steady progress of the audio position and timestamp in the music player bar interface docked at the bottom of the view as well as on the waveform visual.

![Example screenshot](./demo/continuous_play.gif)

To enable this feature, I created a `currentTrack` slice of global Redux UI state to maintain "a single source of truth" for the currently playing track. With a correctly designed Redux pattern, the `currentTrack` will now only be able to be changed using the specific `receiveCurrentTrack` action. This allows all of the components at any given page throughout navigation to have access to the currently playing track information and update themselves accordingly when a new playback is started or to stay put for ensure continuous playback.

Biggest challenge here was correctly filtering the components that should be subscribed to this slice of global Redux state. For example, it was less obvious that the `TrackIndexItem`s on the `Discover` page should also be subscribed in order to correctly display the *play/pause* button over the track image if it was the currently playing track compared to more obvious choice like the `Waveform`s.

The code excerpt below illustrate the architecture of the UI slice of Redux state.

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
Users can click on either the music player bar or the waveform visual to seek to a new audio position. When one is clicked, the other automatically updates as well in sync as demonstrated below.

![Example screenshot](./demo/synced_waveform.gif)

First, I developed a `Waveform ` component to dynamically generate a customized waveform visualization for each track on `TrackShow` and `UserShow` pages using `wavesurfer.js`. There were three total components that required the audio position seek functionality: `TrackShow`'s larger waveform, `UserShow`'s smaller waveforms, and the bottom music player bar. To DRY up the code for this implementation, I designed a modular `SeekBar` to serve as a subcomponent in each of the above.

The biggest challenge was developing a function to handle user input from all three different sources as well as being independent of the client's window size. My initial approach was to find the formula to calculate the clicked audio position using `window.innerWidth`, `MouseEvent.clientX`, and `HTMLElement.offsetWidth`. However, the solution was not elegant because the music player did not have a background page margin while the other two components were in the parts of the page that did in my implementation.

I eventually discovered the `Element.getBoundingClientRect()` method which gives information regarding an element's position relative to the viewport. It enabled me to write the following simple, intuitive function to accomplish what I wanted:

```javascript
function handlePercentage(e) {
  const { left, width } = e.currentTarget.getBoundingClientRect();  
  const newPercentage = Math.floor(((e.clientX - left) / width) * 100);
  this.props.seekPercentage(newPercentage);
    // dispatch the seekPercentage Redux action with the calculated value
}
```

Designing a modular component was challenging initially. However, it made syncing up all the components in Redux easier and DRYing up the code was satisfying.

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