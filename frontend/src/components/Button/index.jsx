import React from 'react';

import './styles.scss'

import PropTypes from 'prop-types';

function Button({ type, buttonText, divClass,  icon, ...props }) {
  return (
    <div className={`div-button ${divClass}`}>
      <button type={type} {...props}>{buttonText} {icon && icon}</button>
    </div>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  divClass: PropTypes.string,
  icon: PropTypes.node
}

export default Button;