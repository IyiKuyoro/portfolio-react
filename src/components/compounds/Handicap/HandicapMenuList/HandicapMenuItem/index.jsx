import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    icon, type,
  } = props;
  const [toolTip, setToolTip] = useState({
    hover: false,
    position: {
      top: 0,
      left: 0,
    },
  });

  if (type === 'checkbox') {
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
        {iconStyle && <div className={`${Styles.icon} ${iconStyle}`} />}
        {!iconStyle && <FontAwesomeIcon icon={icon} className={Styles.icon} />}
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

  return (
    <button
      className={`menu-list-item ${Styles.menuItemButton} ${Styles.menuItem} ${menuItem && Styles.menuItemSelected}`}
      id={id}
      type="button"
      onChange={handleChange}
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
      {iconStyle && <div className={`${Styles.icon} ${iconStyle}`} />}
      {!iconStyle && <FontAwesomeIcon icon={icon} className={Styles.icon} />}
    </button>
  );
}

HandicapMenuItem.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconStyle: PropTypes.string,
  menuItem: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

HandicapMenuItem.defaultProps = {
  iconStyle: '',
  icon: '',
  type: 'checkbox',
};

export default HandicapMenuItem;
