import React from 'react';

import './styles.scss';

import PropTypes from 'prop-types';

function Modal({ children, borderColor }) {
  return (
    <div className="container-modal">
      <div className="content-modal" style={{ borderColor: borderColor }}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  borderColor: PropTypes.string,
}

export default Modal;