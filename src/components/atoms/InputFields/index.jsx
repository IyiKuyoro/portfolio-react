import React from 'react';
import PropTypes from 'prop-types';

import Styles from './inputFields.styles.scss';

export default function Input(props) {
  const {
    name,
    type,
    label,
    inputStyle,
    labelStyle,
    wrapperStyle,
    labelTextStyle,
    addedWrapperStyle,
  } = props;

  const wrapperStyleString = `${wrapperStyle} ${addedWrapperStyle}`;

  return (
    <div className={wrapperStyleString}>
      <label htmlFor={name} className={labelStyle}>
        <span className={labelTextStyle}>{label}</span>
        <input id={name} type={type} className={inputStyle} />
      </label>
    </div>
  );
}

Input.defaultProps = {
  wrapperStyle: Styles.wrapper,
  inputStyle: Styles.input,
  labelStyle: Styles.label,
  labelTextStyle: Styles.labelText,
  addedWrapperStyle: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  wrapperStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  labelTextStyle: PropTypes.string,
  addedWrapperStyle: PropTypes.string,
};
