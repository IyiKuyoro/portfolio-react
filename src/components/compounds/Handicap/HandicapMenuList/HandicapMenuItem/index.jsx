import React from 'react';
import PropTypes from 'prop-types';

import Styles from './handicapMenuItem.styles.scss';

function HandicapMenuItem(props) {
  const {
    ariaLabel, id, iconStyle,
    menuItem, handleChange,
  } = props;

  return (
    <label className={`${Styles.menuItem} ${menuItem && Styles.menuItemSelected}`} htmlFor={id} aria-label={ariaLabel}>
      <div className={`${Styles.icon} ${iconStyle}`} />
      <input
        className={`menu-list-item ${Styles.menuItemCheckbox}`}
        role="menuitemcheckbox"
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
