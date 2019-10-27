import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from 'Atoms/Avatar';
import Button from 'Atoms/Button';
import Styles from './header.styles.scss';

function handleGetCV() {
  window.location = 'https://iyikuyoro-be.herokuapp.com/api/v1/files/cv';
}

function Header(props) {
  const { isAuthenticated } = props;

  return (
    <div className={Styles.header}>
      <div className={Styles.headerWrapper}>
        <h1 className={Styles.title}>Opeoluwa Iyi-Kuyoro</h1>
        <div className={Styles.menuControls}>
          <Button handleClick={handleGetCV} />
          { isAuthenticated && <Avatar sizeStyle={Styles.avatarSize} /> }
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return ({
    isAuthenticated: state.authUser.isAuthenticated,
  });
}

export default connect(mapStateToProps)(Header);
