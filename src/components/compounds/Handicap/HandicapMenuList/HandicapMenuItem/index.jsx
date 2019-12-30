import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ToolTip from 'Atoms/ToolTip';

import Styles from './handicapMenuItem.styles.scss';

function handleMouseEnter(e, setToolTip) {
  setToolTip({
    hover: true,
    position: {
      top: e.clientY,
      left: e.clientX,
    },
  });
}

function handleMouseLeave(setToolTip) {
  setToolTip({
    hover: false,
  });
}

function HandicapMenuItem(props) {
  const {
    ariaLabel, id, iconStyle,
    menuItem, handleChange,
  } = props;
  const [toolTip, setToolTip] = useState({
    hover: false,
    position: {
      top: 0,
      left: 0,
    },
  });

  return (
    <label
      className={`${Styles.menuItem} ${menuItem && Styles.menuItemSelected}`}
      htmlFor={id}
      aria-label={ariaLabel}
      onMouseEnter={(e) => handleMouseEnter(e, setToolTip)}
      onMouseLeave={() => handleMouseLeave(setToolTip)}
      onTouchEnd={() => handleMouseLeave(setToolTip)}
    >
      {toolTip.hover && (
      <ToolTip
        fontSizeStyle={Styles.toolTipFontSize}
        text={ariaLabel}
        toolTipPosition={toolTip.position}
      />
      )}
      <div className={`${Styles.icon} ${iconStyle}`} />
      <input
        className={`menu-list-item ${Styles.menuItemCheckbox}`}
        aria-checked={menuItem}
        id={id}
        type="checkbox"
        onChange={handleChange}
      />
    </label>
  );
}

HandicapMenuItem.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  iconStyle: PropTypes.string.isRequired,
  menuItem: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default HandicapMenuItem;
