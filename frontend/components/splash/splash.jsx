import React from 'react';
import { Link } from 'react-router-dom';
// import { fetchSplashtracks } from '../actions/track_actions  ';
// import TrackIndexItem from './tracks/track_index_item';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.props.fetchSplashtracks();
    // }

    render() {
        // const { tracks } = this.props;
        // let track = null;
        // if (tracks) {
        //     track = tracks.map((track, i) => {
        //         return < TrackIndexItem track={track} liId={i} key={track.id} />
        //     });
        // }

        return (
          <div className="splash-background">
            <div className="splash-main">

              <section className="splash-image">
                <div className="splash-nav">

                  <div className="splash-sc-logo">
                    <img src={window.scLogo} />
                    <h1 className="splash-sc-name">SORICLOUD</h1>
                  </div>

                  <div className="splash-buttons-container">
                    <button
                      className="splash-login"
                      onClick={() => this.props.openModal('login')}>
                        Sign in
                    </button>
                    <button
                      className="splash-signup"
                      onClick={() => this.props.openModal('signup')}>
                        Create account
                    </button>
                    <button
                      className="splash-login"
                      onClick={() => this.props.openModal('login')}>Demo</button>
                  </div>

                </div>

                <div className="container">
                  <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">

                      <div className="item active">
                        <img src={window.splash1}/>
                        <div className="carousel-caption">
                          <h3>Discover more with SoriCloud</h3>
                          <p>SoriCloud lets you listen offline, ad-free, with over 150 million tracks — and growing.</p>
                        </div>
                      </div>

                      <div className="item">
                        <img src={window.splash3}/>
                        <div className="carousel-caption">
                          <h3>What's next in music is first on SoriCloud</h3>
                          <p>Upload your first track and begin your journey. SoriCloud gives you space to create, find your fans, and connect with other artists.</p>
                        </div>
                      </div>
                    
                      <div className="item">
                        <img src={window.splash2}/>
                        <div className="carousel-caption">
                          <h3>We move music</h3>
                          <p>Take your musical journey to the next level.</p>
                        </div>
                      </div>
                  
                    </div>

                  </div>
                </div>

              </section>

              <section className="splash-search">
                <input type="search" autoComplete="off" placeholder="Search under construction!"/>
                <button
                  className="splash-search-submit"
                  type="submit"></button>
                <p>or</p>
                <button
                  className="splash-upload"
                  onClick={() => this.props.openModal('login')}>Upload your own</button>
              </section>

              <section className="user-tracks-section splash-music">
                <h3 className="splash-music-text">
                  Hear what’s trending in the SoriCloud community
                </h3>
                <ul className="album-covers">
                  {/* {track} */}
                  <div>track1</div>
                  <div>track2</div>
                </ul>
                <button
                  className="splash-upload"
                  onClick={() => this.props.openModal('login')}>Explore the collection</button>
              </section>

              <section className="splash-mobile">

                <img src={window.splashMobile}/>

                <div className="splash-mobile-info">
                  <h3 className="splash-mobile-title">
                    Never stop listening
                  </h3>
                  <p className="splash-mobile-text">
                    SoriCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.
                  </p>
                  <img src={window.mobileLinks} />
                </div>

              </section>

              <section className="splash-creator">
                <div className="splash-creator-text">
                  <h3>
                    Calling all creators
                  </h3>
                  <p>
                    Get on SoriCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?
                  </p>
                  <button className="splash-creator-button">
                    Find out more
                  </button>
                </div>
              </section>

              <section className="splash-signup-bottom">
                <h3>
                  Thanks for listening. Now join in.
                </h3>
                <p>
                  Save tracks, follow artists and build playlists. All for free.
                </p>
                <button
                  className="splash-signup-button-bottom"
                  onClick={() => this.props.openModal('signup')}>
                  Create account
                </button>
                <div className="splash-login-bottom">
                  <p>
                    Already have an account?
                  </p>
                  <button
                    className="splash-login-button-bottom"
                    onClick={() => this.props.openModal('login')}>
                    Sign in
                  </button>
                </div>
              </section>

              <section className="space-for-music-bar">

              </section>

            </div>
          </div>
        );
    }
}

export default Splash;
