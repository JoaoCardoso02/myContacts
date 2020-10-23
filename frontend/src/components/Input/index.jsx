import React from 'react';

import './styles.scss';

import PropTypes from 'prop-types';

function Input({ idName, valueLabel, type, required, inputRef, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={idName}>{valueLabel}</label>
      <input type={type} name={idName} id={idName} required={required} ref={inputRef} {...props} />
    </div>
  );
}

Input.propTypes = {
  idName: PropTypes.string,
  valueLabel: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
}

export default Input;