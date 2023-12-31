import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader/Loader';
import '../../Styles/styles.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = { loader: true };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDown);
  }

  handlerKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handlerOnClickClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  handlerCloseLoader = () => {
    this.setState({ loader: false });
  };
  render() {
    const { largeImageURL, tags } = this.props.dataImageForModal;
    return createPortal(
      <div className="Overlay" onClick={this.handlerOnClickClose}>
        <div className="Modal">
          <img
            src={largeImageURL}
            alt={tags}
            onLoad={this.handlerCloseLoader}
          />
        </div>
        {this.state.loader && <Loader />}
      </div>,
      modalRoot
    );
  }
}

export default Modal;
Modal.protoTypes = {
  onClose: PropTypes.func.isRequired,
  dataImageForModal: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
