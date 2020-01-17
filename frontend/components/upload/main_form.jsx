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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.photoFile && this.state.photoFile.type.includes("image")) {
      const formData = new FormData();
      formData.append("track[user_id]", this.state.userId);
      formData.append("track[title]", this.state.title);
      formData.append("track[private]", this.state.private);
      formData.append("track[audio_file]", this.state.audioFile);
      formData.append("track[description]", this.state.description);
      formData.append("track[photo]", this.state.photoFile);
      this.props.uploadTrack(formData).then(arg => {
        return this.handleRedirect(arg);
      });
    } else {
      const formData = new FormData();
      formData.append("track[user_id]", this.state.userId);
      formData.append("track[title]", this.state.title);
      formData.append("track[private]", this.state.private);
      formData.append("track[audio_file]", this.state.audioFile);
      formData.append("track[description]", this.state.description);
      this.props.uploadTrack(formData).then(arg => {
        return this.handleRedirect(arg);
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
          handleSubmit={this.handleSubmit}
        />
      );
    } else {
      return (
        <DragDropForm />
      );
    }
  }
}
