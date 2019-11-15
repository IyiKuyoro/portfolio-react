import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import toggleMenu from 'Actions/controls';
import { userLogOut } from 'Actions/authUser';
import Styles from './usermenu.styles.scss';

function UserMenu(props) {
  const { userMenuOpen, toggleUserMenu, logUserOut } = props;

  return (
    <div
      onClick={() => {
        toggleUserMenu();
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 27) toggleUserMenu();
      }}
      role="button"
      tabIndex="0"
      className={`${Styles.wrapper} ${userMenuOpen ? Styles.visible : Styles.invisible}`}
    >
      <div className={Styles.menuList}>
        <Link to="/write" className={Styles.menuItemLink} type="button">
          <div>Write</div>
        </Link>
        <button onClick={logUserOut} className={Styles.menuItem} type="button">Logout</button>
      </div>
    </div>
  );
}

UserMenu.propTypes = {
  userMenuOpen: PropTypes.bool.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
  logUserOut: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleUserMenu: () => dispatch(toggleMenu()),
    logUserOut: () => dispatch(userLogOut()),
  };
}

function mapStateToProps(state) {
  return ({
    userMenuOpen: state.controls.userMenuOpen,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
