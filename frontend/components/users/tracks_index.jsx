import React from "react";
import TrackItem from "./track_item";

export default function TracksIndex(props) {
  const { tracks } = props;
  const userTracks = tracks.map(track => {
    return (<TrackItem key={track.id} track={track} />);
  });

  return (<div className="user-showpage-tracks-index">{userTracks}</div>);
};
