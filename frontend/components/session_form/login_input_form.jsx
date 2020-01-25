import React, { Component } from "react";
import LoginForm from "./login_form";
import SignupForm from "./signup_form";

export default class LoginInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInput: ""
    };

    this.focusRef = React.createRef();

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextForm = this.handleNextForm.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    this.focusRef.current.focus();
  }

  demoLogin(e) {
    e.preventDefault();
    const demoUser = {
      loginInput: "test@gmail.com",
      password: "123456"
    };
    this.props.login(demoUser).then(this.props.closeModal);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.props.checkLoginInput(this.state.loginInput).then(this.handleNextForm);
  }

  handleNextForm() {
    switch (this.props.nextForm) {
      case "login":
        return (
          <LoginForm
            loginInput={this.state.loginInput}
            errors={this.props.errors}
            login={this.props.login}
            closeModal={this.props.closeModal}
            openModal={this.props.openModal}
          />
        );
      case "signup":
        return (
          <SignupForm
            loginInput={this.state.loginInput}
            signup={this.props.signup}
            closeModal={this.props.closeModal}
            openModal={this.props.openModal}
          />
        );
      default:
        return (
          <div className="login-info-form-container">
            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-info-form">
                <button
                  id="demo-login"
                  className="splash-button modal-item"
                  type="button"
                  onClick={this.demoLogin}
                >
                  Demo Login
                </button>
                <h2>
                  <span>or</span>
                </h2>
                <input
                  ref={this.focusRef}
                  type="text"
                  value={this.state.loginInput}
                  onChange={this.update("loginInput")}
                  className="login-info-input modal-item"
                  placeholder="Your email address or username *"
                />
                {this.renderErrors()}
                <button
                  id="login-form-continue"
                  className="splash-button modal-item"
                  type="submit"
                >
                  Continue
                </button>
                <p className="need-help">Need Help?</p>
                <p className="fine-print">
                  We may use your email and devices for updates and tips on
                  SoriCloud's products and services, and for activities
                  notifications. You can unsubscribe for free at any time in
                  your notification settings.
                </p>
                <p className="fine-print">
                  We may use information you provide us in order to show you
                  targeted ads as described in our{" "}
                  <span className="privacy-policy">Privacy Policy.</span>
                </p>
              </div>
            </form>
          </div>
        );
    }
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
    return this.handleNextForm();
  }
}
