import React from 'react';
import PropTypes from 'prop-types';

import Styles from './toolTip.styles.scss';

function ToolTip(props) {
  const { text, toolTipPosition, fontSizeStyle } = props;

  return (
    <span className={`${Styles.tooltip} ${fontSizeStyle}`} style={toolTipPosition}>{text}</span>
  );
}

ToolTip.propTypes = {
  fontSizeStyle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  toolTipPosition: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
};

export default ToolTip;
