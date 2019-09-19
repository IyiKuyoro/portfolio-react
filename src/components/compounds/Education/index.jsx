import React from 'react';
import PropTypes from 'prop-types';

import Styles from './education.styles.scss';

export default function Education(props) {
  const { yScroll } = props;
  let pStyle = {
    height: 0,
  };

  if (yScroll >= 100) {
    // Change size as you scroll
    pStyle = {
      height: (yScroll - 100),
    };
  }

  return (
    <div className={Styles.education}>
      <div className={Styles.content} style={pStyle} />
    </div>
  );
}

Education.propTypes = {
  yScroll: PropTypes.number.isRequired,
};
