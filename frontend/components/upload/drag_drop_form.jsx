import React from 'react';

export default function DragDropForm(props) {
  const { fileErrors, private, dragFile } = props.allInfo;
  const {
    dropHandler,
    dragOverHandler,
    dragLeaveHandler,
    handleTrackFile,
    handlePrivacy
  } = props;

  const showFileErrors =
    fileErrors.length > 0
      ? fileErrors.map((error, i) => {
          return (
            <li id="errors2" key={`${i}`}>
              {error}
            </li>
          );
        })
      : null;
  
  return (
    <div
      className="track-form-container"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <div className="upload-file-container">
        <h1>Drag and drop your track here</h1>
        {showFileErrors}
        <div className="upload-button">
          <label htmlFor="files">
            <p className="invisible-upload-button">or choose files to upload</p>
            <input id="files" type="file" onChange={handleTrackFile} />
          </label>
        </div>
        <div className="playlist-question">
          <input className="playlist-check" type="checkbox" />
          Make a playlist when multiple files are selected
        </div>

        <div className="private-question">
          <label>
            <span className="privacy">Privacy:</span>
            <input
              type="radio"
              name="false"
              checked={private ? "" : "checked"}
              onChange={handlePrivacy}
            />{" "}
            <label htmlFor="public">
              <span className="public">Public</span>
            </label>
            <input
              type="radio"
              name="true"
              checked={private ? "checked" : ""}
              onChange={handlePrivacy}
            />{" "}
            <label htmlFor="private">
              <span className="private">Private</span>
            </label>
          </label>
        </div>
      </div>
      <div className="file-type-info">
        Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
      </div>
      <div
        className={`drag-over-modal-background ${
          dragFile ? "show-drag-over" : ""
        }`}
        onDragLeave={dragLeaveHandler}
      >
        <div
          className={`drag-over-modal-child ${
            dragFile ? "show-drag-over" : ""
          }`}
        >
          <div
            className={`drag-over-file-upload ${
              dragFile ? "show-drag-over" : ""
            }`}
          >
            Drop your file here
          </div>
        </div>
      </div>
    </div>
  );
}
