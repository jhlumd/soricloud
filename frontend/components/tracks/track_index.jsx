import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';

class TrackIndex extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout().then(() => this.props.history.push('/'));
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className="track-index-page">
                    <button className="logout-button" onClick={this.handleLogout}>Sign out</button>
                </div>
            );
        }

        return (
            <div className="loading"></div>
        );
    }
}

const mstp = ({ session, entities: { users } }) => ({
    currentUser: users[session.id]
});

const mdtp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mstp, mdtp)(TrackIndex);
