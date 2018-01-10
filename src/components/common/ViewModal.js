import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class ViewModal extends React.Component {
  constructor(props, context) {
    super(props,context);
   
    this.state = {
      isShowingModal: this.props.showModal
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isShowingModal: nextProps.showModal});
  }

  handleClick() {
    this.setState({isShowingModal: true});
  }

  handleClose() {
    this.setState({isShowingModal: false});
  }

  render() {
    return (<div onClick={this.handleClick}>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>Deleting...</h1>   
            </ModalDialog>
          </ModalContainer>
        }
      </div>);
  }
}

ViewModal.propTypes = {
  showModal: PropTypes.bool.isRequired
};

export default ViewModal;