import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import toggleMenu from 'Actions/controls';
import Styles from './usermenu.styles.scss';

function UserMenu(props) {
  const { userMenuOpen, toggleUserMenu } = props;

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
        <button className={Styles.menuItem} type="button">Logout</button>
      </div>
    </div>
  );
}

UserMenu.propTypes = {
  userMenuOpen: PropTypes.bool.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleUserMenu: () => dispatch(toggleMenu()),
  };
}

function mapStateToProps(state) {
  return ({
    userMenuOpen: state.controls.userMenuOpen,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
