import React from "react";
import TrackIndexItem from "./track_idex_item";

export default function TracksIndex(props) {
  const { tracks, includePlayButton, history } = props;
  
  const tracksIndex = tracks.map(track => (
    <TrackIndexItem
      key={track.id}
      trackId={track.id}
      photo={track.photoUrl}
      title={track.title}
      history={history}
      includePlayButton={includePlayButton}
    />
  ));

  return (
    <div className="track-index-container">
      <div
        className={`track-index ${includePlayButton ? "" : "home-page-index"}`}
      >
        <div
          className={`track-index-inner ${
            includePlayButton ? "" : "home-page-index"
          }`}
        >
          {tracksIndex}
        </div>
      </div>
    </div>
  );
}
