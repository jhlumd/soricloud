import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchTracks } from "../../actions/track_actions";
import Splash from "./splash";

const mstp = ({ session, entities }) => ({
  currentUser: session.currentUser,
  tracks: Object.values(entities.tracks)
});

const mdtp = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  fetchTracks: () => dispatch(fetchTracks())
});

export default connect(mstp, mdtp)(Splash);
