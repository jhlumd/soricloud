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
                <div className="splash-background">

                    <div className="immitation-navbar">

                    </div>

                <div className="splash-main">
                    <div className="space-for-nav"></div>
                    <button className="logout-button" onClick={this.handleLogout}>Sign out</button>


                    <section className="user-tracks-section splash-music">
                        <h3 className="splash-music-text">
                            Hear the latest posts from the people you’re following:
                        </h3>

                        <div className="tracks-index">
                            <div className="track-item">
                                <div className="album album-1"></div>
                                <p className="track-title">Opus</p>
                                <p className="track-artist">Eric Prydz</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-2"></div>
                                <p className="track-title">All That Matters</p>
                                <p className="track-artist">Kolsch</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-3"></div>
                                <p className="track-title">Bitches Brew</p>
                                <p className="track-artist">Miles Davis</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-4"></div>
                                <p className="track-title">The Velvet Underground</p>
                                <p className="track-artist">The Velvet Underground</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-5"></div>
                                <p className="track-title">1989</p>
                                <p className="track-artist">Taylor Swift</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-6"></div>
                                <p className="track-title">Illmatic</p>
                                <p className="track-artist">Nas</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-7"></div>
                                <p className="track-title">She's So Unusual</p>
                                <p className="track-artist">Cyndi Lauper</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-8"></div>
                                <p className="track-title">The Low End Theory</p>
                                <p className="track-artist">A Tribe Called Quest</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-9"></div>
                                <p className="track-title">Elvis Presley</p>
                                <p className="track-artist">Elvis Presley</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-10"></div>
                                <p className="track-title">Aladdin Sane</p>
                                <p className="track-artist">David Bowie</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-11"></div>
                                <p className="track-title">Purple Rain</p>
                                <p className="track-artist">Prince</p>
                            </div>
                            <div className="track-item">
                                <div className="album album-12"></div>
                                <p className="track-title">Caravelle</p>
                                <p className="track-artist">Jeremy Olander</p>
                            </div>
                        </div>

                        <button className="splash-upload">Get SoriCloud Go+</button>
                    </section>
                </div>
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
