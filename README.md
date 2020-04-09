# <a href="https://soricloud.herokuapp.com/"><img src="./demo/logo.png" alt="SoundCloud Logo" title="Go to SoriCloud" height="55" align="center"></a> SoriCloud - A SoundCloud Clone
> [SoriCloud](https://soricloud.herokuapp.com/ "Go to SoriCloud") is a single-page app for streaming music and uploading your own.

## Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
  * [Continuous audio playback through navigation](#continuous-audio-playback-through-navigation)
  * [Interactive waveform synced with music player](#interactive-waveform-synced-with-music-player)
  <!-- * [Easy audio upload with responsive and intuitive UI](#easy-audio-upload-with-responsive-and-intuitive-ui) -->
  * [Unique signup/login flow](#unique-signuplogin-flow)
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
In-depth explanation of my implementation fo some of the features of the app:

### Continuous audio playback through navigation
Users can navigate to different pages within the website without interrupting the currently playing track. Clicking play on instances of different tracks does not start overlapping audio playback.

Uninterrupted and non-overlapping playback is demonstrated in the screen recording below by the steady progress of the SeekBar and timestamp in the music player interface docked at the bottom of the view.

![Example screenshot](./demo/continuous_play.gif)
Show examples of usage:
```
sample code
```

### Interactive waveform synced with music player
Delve deep into features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions. Code snippets to highlight your best code.

![Example screenshot](./img/screenshot.png)
Show examples of usage:
```
sample code
```

<!-- fixme - add easy upload screenshot after adding loading icon
### Easy upload with responsive and intuitive UI
![Example screenshot](./img/screenshot.png)
Show examples of usage:
```
sample code
``` -->

### Unique signup/login flow
![Example screenshot](./d/logo.png)
Show examples of usage:
```
sample code
```

## Future Directions
* Display a loading icon while the audio upload form in submitting.
* Submitting a comments records the current timestamp of the track if it is currently playing, and clicking the timestamp on the comment starts playback of that track from the corresponding timestamp.
* Optimize rest of the SQL queries to eliminate remaining N+1.
* Search, likes, follows, playlists.

## Contact
Created by [Jaehyuk Lee](mailto:jhlumd@gmail.com) - feel free to contact me!