import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import toggleMenu from 'Actions/controls';
import { userLogOut } from 'Actions/authUser';
import Styles from './usermenu.styles.scss';

function setFocusOn(itemNumber) {
  const menuItem = document.getElementById(`menu-btn-${itemNumber}`);

  menuItem.focus();
}

function handleKeyPress(e, toggleUserMenu) {
  if (e.keyCode === 27) { // Handle escape key press
    toggleUserMenu();
  } else if (e.keyCode === 9) { // Handle tab key press
    const userMenuChildren = document.getElementById('menu-list').children;

    const firstElement = userMenuChildren[0];
    const lastElement = userMenuChildren[userMenuChildren.length - 1];

    if (e.shiftKey && (document.activeElement === firstElement)) {
      e.preventDefault();
      lastElement.focus();
    }

    if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

function UserMenu(props) {
  const {
    toggleUserMenu, logUserOut, history,
  } = props;

  useEffect(() => {
    setFocusOn(1);
  }, []);

  return (
    <div
      onClick={() => {
        toggleUserMenu();
      }}
      onKeyDown={(e) => handleKeyPress(e, toggleUserMenu)}
      role="button"
      tabIndex="-1"
      className={Styles.wrapper}
    >
      <div id="menu-list" className={Styles.menuList}>
        <Link id="menu-btn-1" to="/write" className={Styles.menuItemLink} type="button">
          <div>Write</div>
        </Link>
        <button id="menu-btn-2" onClick={() => logUserOut(history)} className={Styles.menuItem} type="button">Logout</button>
      </div>
    </div>
  );
}

UserMenu.propTypes = {
  toggleUserMenu: PropTypes.func.isRequired,
  logUserOut: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleUserMenu: () => dispatch(toggleMenu()),
    logUserOut: (history) => dispatch(userLogOut(history)),
  };
}

function mapStateToProps(state) {
  return ({
    userMenuOpen: state.controls.userMenuOpen,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserMenu));
