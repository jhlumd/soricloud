import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openModal, closeModal } from '../../actions/modal_actions';
import { login, signup, clearErrors } from '../../actions/session_actions';
import { checkLoginInput } from '../../actions/login_input_actions';
import LoginInputForm from './login_input_form';

const mstp = state => ({
    nextForm: state.ui.loginType,
    session: state.session,
    errors: state.errors.session
});

const mdtp = dispatch => ({
    checkLoginInput: loginInput => dispatch(checkLoginInput(loginInput)),
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(mstp, mdtp)(LoginInputForm));