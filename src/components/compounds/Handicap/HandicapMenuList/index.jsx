import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import toggleAnimations from 'Actions/a11y';

import HandicapMenuCheckbox from './HandicapMenuItem';
import Styles from './handicapMenuList.styles.scss';

let currentMenuItem = 1;
const maxFontSize = 1.4;
const minFontSize = 1.0;

function focusElement(elementId) {
  document.getElementById(`a11y-menu-item-${elementId}`).focus();
}

function handleTextSizeChange(fontSize, setState, increase = true) {
  const root = document.getElementById('root');
  let size = 0;

  if (increase) {
    size = fontSize < maxFontSize ? fontSize += 0.02 : maxFontSize;
  } else {
    size = fontSize > minFontSize ? fontSize -= 0.02 : minFontSize;
  }

  setState({
    fontSize: size,
  });

  root.setAttribute('style', `font-size: ${size}em;`);
}

function HandicapMenuList(props) {
  const {
    animations, switchAnimations, menuOpen,
    toggleMenu,
  } = props;
  const [state, setState] = useState({
    fontSize: 1,
  });

  function handleChangeFocus(keyCode) {
    const numOfElements = document.getElementsByClassName('menu-list-item').length;

    switch (keyCode) {
      case 37:
        break;
      case 38:
        if (currentMenuItem === 1) {
          currentMenuItem = numOfElements;
        } else {
          currentMenuItem -= 1;
        }
        break;
      case 39:
        break;
      default:
        if (currentMenuItem === numOfElements) {
          currentMenuItem = 1;
        } else {
          currentMenuItem += 1;
        }
        break;
    }

    focusElement(currentMenuItem);
  }

  return (
    <div
      className={`${menuOpen ? Styles.handicapMenu : Styles.handicapMenuClosed}`}
      role="menu"
    >
      {menuOpen && (
      <>
        <HandicapMenuCheckbox
          id="a11y-menu-item-1"
          iconStyle={Styles.animatedIcon}
          ariaLabel="Toggle Animations"
          menuItem={animations}
          handleChange={switchAnimations}
          toggleMenu={(e) => {
            currentMenuItem = 1;
            toggleMenu(e);
          }}
          changeFocus={handleChangeFocus}
        />
        <HandicapMenuCheckbox
          id="a11y-menu-item-2"
          icon="minus"
          type="button"
          ariaLabel="Decrease Text Size"
          handleChange={() => handleTextSizeChange(state.fontSize, setState, false)}
          toggleMenu={(e) => {
            currentMenuItem = 1;
            toggleMenu(e);
          }}
          changeFocus={handleChangeFocus}
        />
        <HandicapMenuCheckbox
          id="a11y-menu-item-3"
          icon="plus"
          type="button"
          ariaLabel="Increase Text Size"
          handleChange={() => handleTextSizeChange(state.fontSize, setState)}
          toggleMenu={(e) => {
            currentMenuItem = 1;
            toggleMenu(e);
          }}
          changeFocus={handleChangeFocus}
        />
      </>
      )}
    </div>
  );
}

HandicapMenuList.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  animations: PropTypes.bool.isRequired,
  switchAnimations: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
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
