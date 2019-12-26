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
        id="handicapButton"
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
