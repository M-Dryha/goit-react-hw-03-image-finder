import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  //   console.log(onImage().webformatURL);
  render() {
    return createPortal(
      <div className={s.Overlay}>
        <div className={s.Modal}>
          {this.props.children}
          {/* <img src={onImage().webformatURL} alt={onImage().tags} /> */}
        </div>
      </div>,
      modalRoot
    );
  }
}

// export default Modal;
