import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TrackPlayerC from "../track_player/track_player_container";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionDropdown: false,
      profileDropdown: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.openDropDown = this.openDropDown.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.redirectToProfilePage = this.redirectToProfilePage.bind(this);
  }

  handleLogout() {
    this.props.logout().then(() => this.props.history.push("/"));
  }

  openDropDown(type) {
    this.setState({ [type]: true });
  }

  closeDropDown() {
    if (this.state.sessionDropdown) {
      this.setState({ sessionDropdown: false });
    } else if (this.state.profileDropdown) {
      this.setState({ profileDropdown: false });
    }
  }

  redirectToProfilePage() {
    this.props.history.push(`/users/${this.props.currentUser.id}`);
  }

  render() {
    const {
      currentUser,
      currentTrack
    } = this.props;
    const {
      sessionDropdown,
      profileDropdown
    } = this.state;

    const musicBar = currentTrack ? <TrackPlayerC /> : null;
    const loggedOutNav =
      this.props.location.pathname !== "/" ? (
        <div className="nav-bar-container">
          <div className="nav-bar">
            <button
              id="nav-logo"
              className="nav-bar-button logged-out"
              onClick={() => this.props.history.push("/")}
            >
              <span className="header-name header-logo">
                <img src={window.scLogo} />
                <span id="soricloud">SORICLOUD</span>
              </span>
            </button>
            <NavLink
              to="/discover"
              className="nav-bar-button nav-button"
              activeClassName="active"
              onClick={this.closeDropDown}
            >
              Home
            </NavLink>
            <div className="button-placeholder"></div>
            <div className="logged-out-searchbar-placeholder"></div>
            <div className="signed-out-navbar">
              <button
                id="logged-out-signin"
                onClick={() => this.props.openModal("loginInput")}
                className="splash-button sign-in"
              >
                Sign in
              </button>
              <button
                id="logged-out-create-account"
                onClick={() => this.props.openModal("loginInput")}
                className="splash-button create-account"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      ) : null;

    if (!currentUser) {
      return (
        <>
          {loggedOutNav}
          {musicBar}
        </>
      );
    }

    const profilePicture = (
      <img
        className="profile-picture-nav"
        src={currentUser.photoUrl}
      />
    );

    return (
      <>
        <div className="nav-bar-container" onClick={this.closeDropDown}>
          <div className="nav-bar">
            <NavLink
              to="/discover"
              className="nav-bar-button nav-bar-img-button logged-out"
              onClick={this.closeDropDown}
            >
              <img className="nav-bar-img" src={window.scLogo} />
            </NavLink>
            <NavLink
              to="/discover"
              className="nav-bar-button nav-button"
              activeClassName="active"
              onClick={this.closeDropDown}
            >
              Home
            </NavLink>
            <div className="button-placeholder"></div>
            <div className="searchbar-placeholder"></div>
            <NavLink
              to="/upload"
              className="nav-bar-button nav-button upload"
              activeClassName="active"
              onClick={this.closeDropDown}
            >
              Upload
            </NavLink>
            <div className="dropdown">
              <button
                className={`profile nav-bar-button notification-button ${
                  profileDropdown ? "open" : ""
                }`}
                onClick={() => this.openDropDown("profileDropdown")}
              >
                {profilePicture}{" "}
                <span className="nav-bar-username">{currentUser.username}</span>
                <img className="caret" src={window.caretIcon} />
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${
                  profileDropdown ? "show" : ""
                } dropdown-content-profile`}
              >
                <button
                  className="nav-bar-button logout"
                  id="nav-bar-logout"
                  onClick={this.redirectToProfilePage}
                >
                  Profile
                </button>
              </div>
            </div>
            <div className="small-button-placeholder"></div>
            <div className="dropdown">
              <button
                id="dropDownButton"
                className={`nav-bar-button notification-button ${
                  sessionDropdown ? "open" : ""
                }`}
                onClick={() => this.openDropDown("sessionDropdown")}
              >
                <img className="notification-img" src={window.dotsIcon} />
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${sessionDropdown ? "show" : ""}`}
              >
                <button
                  className="nav-bar-button logout"
                  id="nav-bar-logout"
                  onClick={this.handleLogout}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        {musicBar}
      </>
    );
  }
}
