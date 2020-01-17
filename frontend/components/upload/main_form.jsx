import React, { Component } from 'react';
import DragDropForm from './drag_drop_form';
import DetailsForm from './details_form';

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      title: '',
      privacy: false,
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
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePrivacy = this.handlePrivacy.bind(this);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleTrackFile = this.handleTrackFile.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
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
        imageErrors: ["Please choose an image file"]
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.photoFile && this.state.photoFile.type.includes("image")) {
      const formData = new FormData();
      formData.append("track[user_id]", this.state.userId);
      formData.append("track[title]", this.state.title);
      formData.append("track[private]", this.state.privacy);
      formData.append("track[audio_file]", this.state.audioFile);
      formData.append("track[description]", this.state.description);
      formData.append("track[photo]", this.state.photoFile);
      this.props.uploadTrack(formData).then(res => {
        return this.handleRedirect(res);
      });
    } else {
      const formData = new FormData();
      formData.append("track[user_id]", this.state.userId);
      formData.append("track[title]", this.state.title);
      formData.append("track[private]", this.state.privacy);
      formData.append("track[audio_file]", this.state.audioFile);
      formData.append("track[description]", this.state.description);
      this.props.uploadTrack(formData).then(res => {
        return this.handleRedirect(res);
      });
    }
  }

  handleRedirect(res) {
    return this.props.history.push(`/${res.track.id}`);
  }

  handleChange(field) {
    return e => {
      if (field === "title" && e.currentTarget.value === "") {
        this.setState({
          [field]: e.currentTarget.value,
          titleErrors: ["Enter a title."]
        });
      } else {
        this.setState({
          [field]: e.currentTarget.value,
          titleErrors: []
        });
      }
    };
  }

  handlePrivacy(e) {
    const { privacy } = this.state;
    if (privacy.toString() !== e.currentTarget.name) {
      this.setState(prevState => {
        return { privacy: !prevState.privacy };
      });
    }
  }

  handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.items[0].getAsFile();
    if (file.type.includes("audio")) {
      this.setState({
        audioFile: file,
        title: file.name,
        fileErrors: [],
        dragFile: false
      });
    } else {
      this.setState({
        fileErrors: ["Please choose an audio file"],
        dragFile: false
      });
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    this.setState({ dragFile: true });
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.setState({ dragFile: false });
  }

  handleTrackFile(e) {
    const file = e.currentTarget.files[0];
    if (file.type.includes("audio")) {
      this.setState({
        audioFile: file,
        title: file.name,
        errors: [],
        dragFile: false
      });
    } else {
      alert("Please choose an audio file");
      this.setState({
        errors: ["Please choose an audio file"],
        dragFile: false
      });
    }
  }

  handleCancel() {
    this.setState({
      title: "",
      privacy: false,
      audioFile: null,
      dragFile: false,

      description: "",
      photoFile: null,
      photoUrl: window.defaultTrackPhoto,

      fileErrors: [],
      titleErrors: [],
      imageErrors: []
    });
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
          handleChange={this.handleChange}
          handlePrivacy={this.handlePrivacy}
          handleCancel={this.handleCancel}
        />
      );
    } else {
      return (
        <DragDropForm
          allInfo={this.state}
          handleDrop={this.handleDrop}
          handleDragOver={this.handleDragOver}
          handleDragLeave={this.handleDragLeave}
          handleTrackFile={this.handleTrackFile}
          handlePrivacy={this.handlePrivacy}
        />
      );
    }
  }
}
