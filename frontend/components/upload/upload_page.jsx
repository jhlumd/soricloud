import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainForm from './main_form';
import { uploadTrack } from '../../actions/track_actions';

const UploadPage = props => {
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

const mstp = state => ({
  userId: state.session.id
});

const mdtp = dispatch => ({
  uploadTrack: formData => dispatch(uploadTrack(formData))
});

export default withRouter(connect(mstp, mdtp)(UploadPage));
