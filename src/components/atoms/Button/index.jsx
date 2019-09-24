import React from 'react';
import PropTypes from 'prop-types';

import Styles from './button.styles.scss';

export default function Button(props) {
  const { text, handleClick } = props;

  return (
    <button
      onClick={handleClick}
      className={Styles.btn}
      type="button"
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'CV',
};

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
