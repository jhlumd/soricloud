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

                    <div className="navbar-container">

                        <div className="navbar-content">
                            <section className="left-nav">
                                <div className="nav-logo"></div>
                                <div className="nav-menu home">Home</div>
                                <div className="nav-menu">Stream</div>
                                <div className="nav-menu">Library</div>

                                <div className="nav-search"></div>
                            </section>

                            <section className="right-nav">
                                <div className="nav-prof-pic"></div>
                                <div className="nav-username link-light">{this.props.currentUser.username}</div>
                                <button className="nav-logout-button link-light" onClick={this.handleLogout}>Sign out</button>
                            </section>
                        </div>

                    </div>

                <div className="splash-main">
                    <div className="space-for-nav"></div>


                    <section className="splash-music">
                        <h3 className="track-index-title">
                            Hear the latest posts from the people you’re following:
                        </h3>

                        <div className="tracks-index">
                            <div className="track-item">
                                <div className="album album-1"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Eric Prydz</p>
                                    <p className="track-title">Opus</p>
                                    <div className="waveform waveform-2"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-2"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Kolsch</p>
                                    <p className="track-title">All That Matters</p>
                                    <div className="waveform waveform-3"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-3"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Miles Davis</p>
                                    <p className="track-title">Bitches Brew</p>
                                    <div className="waveform waveform-4"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-4"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">The Velvet Underground</p>
                                    <p className="track-title">The Velvet Underground</p>
                                    <div className="waveform waveform-5"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-5"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Taylor Swift</p>
                                    <p className="track-title">1989</p>
                                    <div className="waveform waveform-2"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-6"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Nas</p>
                                    <p className="track-title">Illmatic</p>
                                    <div className="waveform waveform-4"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-7"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Cyndi Lauper</p>
                                    <p className="track-title">She's So Unusual</p>
                                    <div className="waveform waveform-3"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-8"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">A Tribe Called Quest</p>
                                    <p className="track-title">The Low End Theory</p>
                                    <div className="waveform waveform-2"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-9"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Elvis Presley</p>
                                    <p className="track-title">Elvis Presley</p>
                                    <div className="waveform waveform-5"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-10"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">David Bowie</p>
                                    <p className="track-title">Aladdin Sane</p>
                                    <div className="waveform waveform-3"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-11"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Prince</p>
                                    <p className="track-title">Purple Rain</p>
                                    <div className="waveform waveform-4"></div>
                                </div>
                            </div>
                            <div className="track-item">
                                <div className="album album-12"></div>
                                <div className="track-info-container">
                                    <p className="track-artist">Jeremy Olander</p>
                                    <p className="track-title">Caravelle</p>
                                    <div className="waveform waveform-5"></div>
                                </div>
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
