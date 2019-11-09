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

<div className="container">
  <h2>Carousel Example</h2>
  <div id="myCarousel" className="carousel slide" data-ride="carousel">
    
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <div className="carousel-inner">

      <div className="item active">
        <img src={window.splash1} alt="Los Angeles"/>
        <div className="carousel-caption">
          <h3>Los Angeles</h3>
          <p>LA is always so much fun!</p>
        </div>
      </div>

      <div className="item">
        <img src={window.splash2} alt="Chicago"/>
        <div className="carousel-caption">
          <h3>Chicago</h3>
          <p>Thank you, Chicago!</p>
        </div>
      </div>
    
      <div className="item">
        <img src={window.splash3} alt="New York"/>
        <div className="carousel-caption">
          <h3>New York</h3>
          <p>We love the Big Apple!</p>
        </div>
      </div>
  
    </div>

    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>



                    <section className="splash-image-1">
                        <div className="splash-nav">

                            <div className="splash-sc-logo">
                                <img src={window.scLogo} />
                                <h1 className="splash-sc-name">SORICLOUD</h1>
                            </div>

                            <div className="splash-buttons-container">
                                <button
                                    className="splash-login"
                                    onClick={() => this.props.openModal('login')}>Sign In</button>
                                <button
                                    className="splash-signup"
                                    onClick={() => this.props.openModal('signup')}>Create account</button>
                                <button
                                    className="splash-login"
                                    onClick={() => this.props.openModal('login')}>Demo</button>
                            </div>

                        </div>

                        <div>
                            <h4 className="splash-text-title">
                                Discover more with SoriCloud
                            </h4>
                            <p className="splash-text-p">
                                Upload your first track and begin your journey. SoriCloud gives you space to create, find your fans, and connect with other artists.
                            </p>
                        </div>

                    </section>

                    <section className="splash-search">
                        <input type="search" autoComplete="off" placeholder="Search under construction!"/>
                        <i class="fas fa-search splash-search-submit"></i>
                        <button className="splash-search-submit" type="submit"></button>
                    </section>

                    <section className="user-tracks-section splash-music">
                        <h3 className="splash-music-text">
                            Hear what’s trending in the SoriCloud community
                        </h3>
                        <ul className="album-covers">
                            {/* {track} */}
                        </ul>
                        <Link to="/tracks" className="nav-button signup collection">
                            Explore the collection
                        </Link>
                    </section>

                </div>
            </div>
        );
    }
}

export default Splash;
