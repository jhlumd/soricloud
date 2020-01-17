import React from "react";
import LoginForm from "./login_form";
import SignupForm from "./signup_form";

class LoginInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInput: ""
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextForm = this.handleNextForm.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.login({
      loginInput: "test@gmail.com",
      password: "123456"
    });
    this.props.history.push("/discover");
    this.props.closeModal();
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
            clearErrors={this.props.clearErrors}
            login={this.props.login}
            closeModal={this.props.closeModal}
            openModal={this.props.openModal}
            history={this.props.history}
            session={this.props.session}
          />
        );
      case "signup":
        return (
          <SignupForm
            loginInput={this.state.loginInput}
            errors={this.props.errors}
            clearErrors={this.props.clearErrors}
            signup={this.props.signup}
            closeModal={this.props.closeModal}
            openModal={this.props.openModal}
            history={this.props.history}
            session={this.props.session}
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
                  onClick={this.demoLogin}
                >
                  Demo Login
                </button>
                <h2>
                  <span>or</span>
                </h2>
                <input
                  type="text"
                  value={this.state.loginInput}
                  onChange={this.update("loginInput")}
                  className="login-info-input modal-item"
                  placeholder="Your email address or profile URL *"
                />
                {this.renderErrors()}
                <input
                  id="login-form-continue"
                  className="splash-button modal-item"
                  type="submit"
                  value="Continue"
                />
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

export default LoginInputForm;
