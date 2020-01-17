import React from 'react';
import MainForm from './main_form';

export default function UploadPage(props) {
  const handleDrag = e => {
    e.preventDefault();
  };

  return (
    <div className="upload-page" onDragOver={handleDrag}>
      <div className="upload-page-nav">
        <div className="upload-page-nav-links">
          <div className="upload-page-nav-link">
            Upload
          </div>
          <div className="track-link-placeholder"></div>
        </div>
        <button id="for-creators" className="upload-page-nav-button">
          For Creators on SoriCloud
        </button>
      </div>
      <MainForm
        userId={props.userId}
        uploadTrack={props.uploadTrack}
        openModal={props.openModal}
        history={props.history}
      />
    </div>
  );
}
