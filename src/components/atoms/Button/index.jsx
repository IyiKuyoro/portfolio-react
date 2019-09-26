import React from 'react';
import PropTypes from 'prop-types';

import Styles from './button.styles.scss';

export default function Button(props) {
  const { text, handleClick, style } = props;

  return (
    <button
      onClick={handleClick}
      className={style}
      type="button"
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'CV',
  style: Styles.btn,
};

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  style: PropTypes.string,
};
