import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInput: props.loginInput,
            password: ''
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleRedirect();
        this.props.login(this.state);
    }

    handleRedirect() {
        this.props.closeModal();
        this.props.history.push('/tracks');
    }

    switchModal() {
        this.props.closeModal();
        this.props.openModal('loginInput');
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li id="errors" key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-info-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <div className="login-info-form">
                        <button
                            form=""
                            className="login-info-input modal-item loginInput"
                            onClick={this.switchModal}>&#9668; {this.state.loginInput}</button>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            className="login-info-input modal-item"
                            placeholder="Your Password *"
                        />
                        {this.renderErrors()}
                        <input
                            id="login-form-continue"
                            className="splash-button modal-item"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;
