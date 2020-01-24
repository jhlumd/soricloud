import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";
import NavBar from "./nav_bar";

const mstp = state => ({
  currentUser: state.entities.users[state.session.id] || null,
  currentTrack: state.ui.currentTrack
});

const mdtp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mstp, mdtp)(NavBar));
