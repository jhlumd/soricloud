import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
// import { fetchTracks, fetchCurrentTrack } from '../../actions/track_actions';
import Splash from './splash';

const mstp = ({ session, entities }) => ({
    currentUser: session.currentUser
    // currentUser: entities.users[session.id]
    // tracks: Object.values(entities.tracks)
});

const mdtp = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
    // fetchTracks: () => dispatch(fetchTracks())
    // fetchSplashtracks: () => dispatch(fetchSplashtracks())
});

export default connect(mstp, mdtp)(Splash);
