import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
    if (currentUser) {
        return (
            <div className="header-group">
                <h2 className="header-name">Hi, {currentUser.username}!</h2>
                <button className="header-button" onClick={logout}>Log Out</button>
            </div>
        );
    } else {
        return (
            <nav className="login-signup">
                <Link to="/signup">Sign up!</Link>
                <Link to="/login">Login</Link>
            </nav>
        );
    }
};

export default Greeting;
