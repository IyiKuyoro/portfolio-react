import React from 'react';
import PropTypes from 'prop-types';

export default function Input(props) {
  const { name, type, label } = props;

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <input id={name} type={type} />
      </label>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
