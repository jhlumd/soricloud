import React from 'react';
// import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.props.closeModal);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    Create your SoriCloud account
                    <br />
                    <div onClick={this.props.closeModal} className="close-x">X</div>
                    <div className="login-form">
                        <br />
                        <label>
                            <input type="email"
                                value={this.state.email}
                                onChange={this.update('email')}
                                className="login-input"
                                placeholder="Your email address *"
                            />
                        </label>
                        <br />
                        <label>
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className="login-input"
                                placeholder="Choose a username *"
                            />
                        </label>
                        <br />
                        <label>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="login-input"
                                placeholder="Choose a password *"
                            />
                        </label>
                        <br />
                        {this.renderErrors()}
                        <br />
                        <input className="session-submit"
                            type="submit"
                            value="Accept & continue"
                        />
                    </div>
                </form>
                <br />
                Already have an account? {this.props.otherForm}
            </div>
        );
    }
}

export default SignupForm;
