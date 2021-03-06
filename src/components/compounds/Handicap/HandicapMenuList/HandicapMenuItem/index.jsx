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
    icon, type, toggleMenu,
    changeFocus,
  } = props;
  const [toolTip, setToolTip] = useState({
    hover: false,
    position: {
      top: 0,
      left: 0,
    },
  });

  function activateMenu(e) {
    handleChange(e);
    toggleMenu(e);
  }

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
        type={type}
        role={type === 'checkbox' ? 'menuitemcheckbox' : 'menuitem'}
        tabIndex="-1"
        onClick={(e) => {
          // Had to separate the real click from enter/space bar somehow
          if (e.screenX >= 1) {
            handleChange(e);
          }
        }}
        onKeyPress={(e) => {
          e.preventDefault();
          if (e.charCode === 13) {
            activateMenu(e);
          } else if (e.charCode === 32) {
            handleChange(e);
          }
        }}
        onKeyDown={(e) => {
          if (e.keyCode >= 37 && e.keyCode <= 40) {
            changeFocus(e.keyCode);
            e.preventDefault();
          } else if (e.keyCode === 9) {
            toggleMenu(e);
          } else if (e.keyCode === 27) {
            toggleMenu(e);
          }
        }}
      />
    </label>
  );
}

HandicapMenuItem.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconStyle: PropTypes.string,
  menuItem: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  changeFocus: PropTypes.func.isRequired,
};

HandicapMenuItem.defaultProps = {
  iconStyle: '',
  icon: '',
  type: 'checkbox',
  menuItem: false,
};

export default HandicapMenuItem;
