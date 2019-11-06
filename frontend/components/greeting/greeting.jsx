import React from 'react';

const Greeting = ({ currentUser, logout, openModal }) => {
    if (currentUser) {
        return (
            <hgroup className="header-group">
                <h2 className="header-name">Hi, {currentUser.username}!</h2>
                <button className="header-button" onClick={logout}>Log Out</button>
            </hgroup>
        );
    } else {
        return (
            <nav className="login-signup">
                <button onClick={() => openModal('login')}>Login</button>
                {' or '}
                <button onClick={() => openModal('signup')}>Signup</button>
            </nav>
        );
    }
};

export default Greeting;
