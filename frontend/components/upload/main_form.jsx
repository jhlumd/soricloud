import React, { Component } from 'react';
import DragDropForm from './drag_drop_form';
import DetailsForm from './details_form';

// need to connect uploadTrack

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId, // connect
      title: '',
      private: false,
      audioFile: null,
      dragFile: false,

      description: '',
      photoFile: null,
      photoUrl: window.defaultTrackPhoto,

      fileErrors: [],
      imageErrors: [],
      titleErrors: []
    };
  }

  render() {
    return (
      <DetailsForm
        allInfo={this.state}
        uploadTrack={this.props.uploadTrack}
        history={this.props.history}
      />
    );
  }
}
