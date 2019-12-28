import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import toggleAnimations from 'Actions/a11y';

import HandicapMenuItem from './HandicapMenuItem';
import Styles from './handicapMenuList.styles.scss';

function HandicapMenuList(props) {
  const { animations, switchAnimations, menuOpen } = props;

  return (
    <div
      className={`${menuOpen ? Styles.handicapMenu : Styles.handicapMenuClosed}`}
      role="menu"
    >
      <HandicapMenuItem
        id="toggle-animations"
        iconStyle={Styles.animatedIcon}
        ariaLabel="Toggle animations"
        menuItem={animations}
        handleChange={switchAnimations}
      />
    </div>
  );
}

HandicapMenuList.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  animations: PropTypes.bool.isRequired,
  switchAnimations: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    switchAnimations: () => dispatch(toggleAnimations()),
  };
}

function mapStateToProps(state) {
  return ({
    animations: state.a11y.animations,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(HandicapMenuList);