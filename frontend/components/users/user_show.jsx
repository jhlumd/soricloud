import React, { Component } from "react";
import TracksIndex from "./tracks_index";

export default class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false
    };

    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
    this.showEditButton = this.showEditButton.bind(this);
    this.hideEditButton = this.hideEditButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    // fixme fetch tracks by user
    // this.props.fetchTracks
  }

  showEditButton() {
    this.setState({ showEdit: true });
  }

  hideEditButton() {
    this.setState({ showEdit: false });
  }

  handlePhotoUpdate(e) {
    e.preventDefault();
    const photoFile = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("user[id]", this.props.currentUserId);
    formData.append("user[photo]", photoFile);
    this.props.updateUser(formData, this.props.currentUserId);
  }

  render() {
    const { currentUserId, user, tracks } = this.props;

    let profilePicture = null;
    let username = null;
    let userTracksIndex = null;
    let editButton = null;
    if (user) {
      profilePicture = (
        <img
          className="user-showpage-profile-picture"
          src={user.photoUrl}
          onMouseEnter={this.showEditButton}
        />
      );
      username = user.username;
      if (tracks) {
        userTracksIndex = (<TracksIndex tracks={tracks} />);
      }
      if (user.id === currentUserId && this.state.showEdit) {
        editButton = (
          <div className="image-edit-button user-showpage-image-edit-button">
            <label htmlFor="files">
              <div className="inside">
                <img src={window.cameraIcon} />
                <p>Update image</p>
                <input
                  id="files"
                  type="file"
                  onChange={this.handlePhotoUpdate}
                />
              </div>
            </label>
          </div>
        );
      }
    }

    return (
      <div className="centering-background">
        <div className="centering-outer">
          <div className="user-showpage">
            <div
              className="user-showpage-header"
              onMouseLeave={this.hideEditButton}
            >
              {profilePicture}
              {editButton}
              <ul className="user-showpage-info">
                <li className="user-showpage-username">{username}</li>
              </ul>
            </div>
            <div className="user-showpage-bottom">{userTracksIndex}</div>
          </div>
        </div>
      </div>
    );
  }
}
