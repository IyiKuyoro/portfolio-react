import React, { Component } from 'react';

import Styles from './handicap.styles.scss';

class Handicap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdStart: 0,
      top: 'calc(100% - calc(10px + 4em))',
      left: 10,
    };
    this.hookUpDragElement = this.hookUpDragElement.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  componentWillUnmount() {
    document.onmousemove = null;
  }

  hookUpDragElement(e) {
    this.setState({
      holdStart: e.timeStamp,
    });
    document.onmousemove = this.dragElement;
  }

  dragElement(e) {
    this.setState({
      top: e.clientY - 20,
      left: e.clientX - 20,
    });
  }

  openMenu(e) {
    const { holdStart } = this.state;

    if (e.timeStamp - holdStart > 500) {
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
      <button
        className={Styles.handicapButton}
        type="button"
        aria-label="Accessibility Menu"
        onMouseDown={(e) => this.hookUpDragElement(e)}
        onMouseUp={() => { document.onmousemove = null; }}
        onClick={(e) => this.openMenu(e)}
        style={position}
      >
        <i className={`fas fa-wheelchair ${Styles.handicapIcon}`} />
      </button>
    );
  }
}

export default Handicap;
