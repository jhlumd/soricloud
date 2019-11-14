import { RECEIVE_LOGIN_INPUT } from '../actions/login_input_actions';
import { CLOSE_MODAL } from '../actions/modal_actions';

const loginInputReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LOGIN_INPUT:
            return action.loginInput;
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
};

export default loginInputReducer;
