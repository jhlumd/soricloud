import { combineReducers } from 'redux';

import modalReducer from './modal_reducer';
import loginInputReducer from './login_input_reducer';
import loginTypeReducer from './login_type_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    loginInput: loginInputReducer,
    loginType: loginTypeReducer
});

export default uiReducer;
