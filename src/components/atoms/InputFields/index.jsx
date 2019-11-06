import React from 'react';
import { string, bool, func } from 'prop-types';

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
    value,
    editValue,
    validateInput,
    error,
    errorMessage,
  } = props;

  const wrapperStyleErrorString = `${wrapperStyle} ${Styles.wrapperStyleError}`;

  return (
    <div className={addedWrapperStyle}>
      <p className={`${error ? Styles.errorMessage : Styles.errorMessageInvisible}`}>{errorMessage}</p>
      <div className={`${error ? wrapperStyleErrorString : wrapperStyle}`}>
        <label htmlFor={name} className={labelStyle}>
          <span className={labelTextStyle}>{label}</span>
          <input
            id={name}
            type={type}
            className={inputStyle}
            value={value}
            onChange={
              (event) => {
                validateInput(name, event.target.value);
                editValue(event.target.value);
              }
            }
            onBlur={
              (event) => {
                validateInput(name, event.target.value);
              }
            }
          />
        </label>
      </div>
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
  type: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  wrapperStyle: string,
  inputStyle: string,
  labelStyle: string,
  labelTextStyle: string,
  addedWrapperStyle: string,
  value: string.isRequired,
  editValue: func.isRequired,
  validateInput: func.isRequired,
  error: bool.isRequired,
  errorMessage: string.isRequired,
};
