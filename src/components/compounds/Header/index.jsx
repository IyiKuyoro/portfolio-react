import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from 'Atoms/Avatar';
import Button from 'Atoms/Button';
import toggleMenu from 'Actions/controls';
import Styles from './header.styles.scss';

function handleGetCV() {
  window.location = 'https://iyikuyoro-be.herokuapp.com/api/v1/files/cv';
}

function Header(props) {
  const { isAuthenticated, toggleUserMenu } = props;

  return (
    <div className={Styles.header}>
      <div className={Styles.headerWrapper}>
        <Link className={Styles.homeLink} to="/"><h1 className={Styles.title}>Opeoluwa Iyi-Kuyoro</h1></Link>
        <div className={Styles.menuControls}>
          <Button handleClick={handleGetCV} />
          { isAuthenticated && (
          <Avatar
            sizeStyle={Styles.avatarSize}
            handleClick={() => {
              toggleUserMenu();
            }}
            handleKeyPress={() => {
              toggleUserMenu();
            }}
          />
          ) }
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  toggleUserMenu: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return ({
    toggleUserMenu: () => dispatch(toggleMenu()),
  });
}

function mapStateToProps(state) {
  return ({
    isAuthenticated: state.authUser.isAuthenticated,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
