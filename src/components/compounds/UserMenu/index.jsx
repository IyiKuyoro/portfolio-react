import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import toggleMenu from 'Actions/controls';
import { userLogOut } from 'Actions/authUser';
import Styles from './usermenu.styles.scss';

function UserMenu(props) {
  const {
    toggleUserMenu, logUserOut, history,
  } = props;

  useEffect(() => {
    const writeBtn = document.getElementById('write-btn');

    writeBtn.focus();
  }, []);

  return (
    <div
      onClick={() => {
        toggleUserMenu();
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 27) toggleUserMenu();
      }}
      role="button"
      tabIndex="-1"
      className={Styles.wrapper}
    >
      <div className={Styles.menuList}>
        <Link id="write-btn" to="/write" className={Styles.menuItemLink} type="button">
          <div>Write</div>
        </Link>
        <button id="logout" onClick={() => logUserOut(history)} className={Styles.menuItem} type="button">Logout</button>
      </div>
    </div>
  );
}

UserMenu.propTypes = {
  toggleUserMenu: PropTypes.func.isRequired,
  logUserOut: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

function tabMenu() {
  // Handle tabbing in menu
}

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
