import * as APIUtil from '../util/login_input_api_util';
import { receiveErrors } from './session_actions';

export const RECEIVE_LOGIN_INPUT = 'RECEIVE_LOGIN_INPUT';

export const receiveLoginInput = ({ loginInput, loginType }) => ({
    type: RECEIVE_LOGIN_INPUT,
    loginInput,
    loginType
});

export const checkLoginInput = loginInput => dispatch => (
    APIUtil.checkLoginInput(loginInput).then(
        user => dispatch(receiveLoginInput(user)),
        err => dispatch(receiveErrors(err.responseJSON))
    )
);
