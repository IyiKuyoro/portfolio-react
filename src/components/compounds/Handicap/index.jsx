import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import toggleAnimations from 'Actions/a11y';

import Styles from './handicap.styles.scss';

class Handicap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdStart: 0,
      top: 'calc(100% - calc(10px + 2.5em))',
      left: 20,
      menuOpen: false,
    };
    this.hookUpDragElement = this.hookUpDragElement.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    const el = document.getElementById('handicapButton');
    el.addEventListener('touchmove', this.dragElement, { passive: false });
  }

  componentWillUnmount() {
    document.onmousemove = null;
    document.ontouchmove = null;
  }

  hookUpDragElement(e) {
    this.setState({
      holdStart: e.timeStamp,
    });
    document.onmousemove = this.dragElement;
  }

  dragElement(e) {
    e.preventDefault();
    const { clientY, clientX } = e.type === 'touchmove' ? e.touches[0] : e;

    this.setState({
      top: clientY - 20,
      left: clientX - 20,
    });
  }

  toggleMenu(e) {
    const { holdStart, menuOpen } = this.state;

    if (
      (e.type !== 'keypress' && (e.timeStamp - holdStart <= 500))
      || e.type === 'keypress'
    ) {
      this.setState({
        menuOpen: !menuOpen,
      });

      // If menu is opening, send focus to first menu item
      if (!menuOpen) {
        setTimeout(() => {
          document.getElementsByClassName('menu-list-item')[0].focus();
        }, 10);
      }
    } else {
      e.preventDefault();
    }
  }

  render() {
    const { top, left, menuOpen } = this.state;
    const { animations, switchAnimations } = this.props;

    const position = {
      top,
      left,
    };

    return (
      <div
        className={`${Styles.handicapWrapper} ${menuOpen || Styles.handicapWrapperClosed}`}
        style={position}
      >
        <button
          id="handicapButton"
          onMouseDown={(e) => this.hookUpDragElement(e)}
          onMouseUp={() => { document.onmousemove = null; }}
          onClick={(e) => this.toggleMenu(e)}
          onKeyPress={(e) => {
            if (e.charCode === 32 || e.charCode === 13) {
              this.toggleMenu(e);
            }
          }}
          className={`${Styles.handicapButton} ${menuOpen && Styles.handicapButtonOpen}`}
          type="button"
          aria-label={`Accessibility menu ${menuOpen ? 'close' : 'open'}`}
        >
          <i className={`fas fa-wheelchair ${Styles.handicapIcon}`} />
        </button>
        <div
          className={`${menuOpen ? Styles.handicapMenu : Styles.handicapMenuClosed}`}
          role="menu"
        >
          <label className={`${Styles.menuItem} ${animations && Styles.menuItemSelected}`} htmlFor="toggle-animations" aria-label="Toggle animations">
            <div className={`${Styles.icon} ${Styles.animatedIcon}`} />
            <input
              className={`menu-list-item ${Styles.menuItemCheckbox}`}
              role="menuitemcheckbox"
              aria-checked={animations}
              id="toggle-animations"
              type="checkbox"
              onChange={() => switchAnimations()}
            />
          </label>
        </div>
      </div>
    );
  }
}

Handicap.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Handicap);
