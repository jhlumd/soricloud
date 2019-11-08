import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
// import { fetchTracks, fetchCurrentTrack } from '../../actions/track_actions';
import Splash from './splash';

const mapStateToProps = ({ session, entities }) => ({
    currentUser: session.currentUser
    // tracks: Object.values(entities.tracks)
});

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
    // fetchTracks: () => dispatch(fetchTracks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);