import React from 'react';

import Styles from './button.styles.scss';

export default function Button(props) {
  const { text } = { ...props };

  return (
    <button className={Styles.btn} type="button">
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'Get a copy of my CV',
};
