import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchTracks } from "../../actions/track_actions";
import Discover from "./discover";

const mstp = state => ({
  tracks: Object.values(state.entities.tracks)
});
const mdtp = dispatch => ({
  fetchTracks: () => dispatch(fetchTracks())
});

export default withRouter(connect(mstp, mdtp)(Discover));
