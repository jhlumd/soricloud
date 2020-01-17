import React, { Component } from 'react';
import DragDropForm from './drag_drop_form';
import DetailsForm from './details_form';

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      title: '',
      private: false,
      audioFile: null,
      dragFile: false,

      description: '',
      photoFile: null,
      photoUrl: window.defaultTrackPhoto,

      fileErrors: [],
      titleErrors: [],
      imageErrors: []
    };

    this.handlePhotoFile = this.handlePhotoFile.bind(this);
  }

  handlePhotoFile(e) {
    const file = e.currentTarget.files[0];
    if (file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          photoFile: file,
          photoUrl: reader.result,
          imageErrors: []
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      this.setState({
        imageErrors: ["Please upload an image file"]
      });
    }
  }

  render() {
    const { audioFile } = this.state;

    if (audioFile) {
      return (
        <DetailsForm
          allInfo={this.state}
          history={this.props.history}
          uploadTrack={this.props.uploadTrack}
          handlePhotoFile={this.handlePhotoFile}
        />
      );
    } else {
      return (
        <DragDropForm />
      );
    }
  }
}
