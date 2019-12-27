import React, { Component } from 'react';

import Styles from './handicap.styles.scss';

class Handicap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdStart: 0,
      top: 'calc(100% - calc(10px + 5em))',
      left: 20,
    };
    this.hookUpDragElement = this.hookUpDragElement.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.openMenu = this.openMenu.bind(this);
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

  openMenu(e) {
    const { holdStart } = this.state;

    if (e.timeStamp - holdStart <= 500) {
      console.log('clicked');
    } else {
      e.preventDefault();
    }
  }

  render() {
    const { top, left } = this.state;

    const position = {
      top,
      left,
    };

    return (
      <div
        className={Styles.handicapWrapper}
        style={position}
      >
        <button
          id="handicapButton"
          onMouseDown={(e) => this.hookUpDragElement(e)}
          onMouseUp={() => { document.onmousemove = null; }}
          onClick={(e) => this.openMenu(e)}
          className={Styles.handicapButton}
          type="button"
          aria-label="Accessibility Menu"
        >
          <i className={`fas fa-wheelchair ${Styles.handicapIcon}`} />
        </button>
        <div className={Styles.handicapMenu} role="menu">
          <label className={Styles.menuItem} htmlFor="toggle-animations" aria-label="Toggle animations">
            <div className={`${Styles.icon} ${Styles.animatedIcon}`} />
            <input className={Styles.menuItemCheckbox} role="menuitemcheckbox" aria-checked="false" id="toggle-animations" type="checkbox" />
          </label>
        </div>
      </div>
    );
  }
}

export default Handicap;
