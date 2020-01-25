import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserShow from "./user_show";
import { fetchUser, updateUser } from "../../actions/user_actions";

const mstp = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId];
  const currentUserId = state.session.id;
  let tracks;
  if (user && user.tracks && user.tracks.length > 0) {
    tracks = user.tracks.map(trackId => {
      return state.entities.tracks[trackId];
    });
  }
  return {
    currentUserId,
    user,
    tracks
  };
};

const mdtp = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id)),
  updateUser: user => dispatch(updateUser(user))
});

export default withRouter(connect(mstp, mdtp)(UserShow));
