import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modal_actions';
import LoginInputFormContainer from '../session_form/login_input_form_container';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalReady: false
        };
    }

    componentDidUpdate() {
        if (this.props.modal && !this.state.modalReady) {
            setTimeout(() => this.setState({ modalReady: true }), 500);
        } else if (!this.props.modal && this.state.modalReady) {
            this.setState({ modalReady: false });
        }
    }


    render() {
        if (!this.props.modal) {
            return null;
        }
        let component;
        switch (this.props.modal) {
            case 'loginInput':
                component = <LoginInputFormContainer />;
                break;
            default:
                return null;
        }
        return (
            <div className="modal-background" onClick={() => this.props.closeModal()}>
                <div className="modal-positioner">
                    <div className={`modal-child-start ${this.state.modalReady ? "modal-child" : ""}`} onClick={e => e.stopPropagation()}>
                        {component}
                    </div>
                </div>

            </div>
        );
    }
}

const mstp = (state) => {
    return {
        modal: state.ui.modal,
    };
};

const mdtp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mstp, mdtp)(Modal);
