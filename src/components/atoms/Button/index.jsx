import React from 'react';
import { string, func } from 'prop-types';

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
  text: string,
  handleClick: func.isRequired,
  style: string,
};
