import React, { Component } from 'react';

import ToolTip from 'Atoms/ToolTip';

import Styles from './handicap.styles.scss';
import HandicapMenuList from './HandicapMenuList';

class Handicap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdStart: 0,
      top: 'calc(100% - calc(10px + 2.5em))',
      left: 20,
      menuOpen: false,
      hover: false,
      toolTipPosition: {
        top: 0,
        left: 0,
      },
    };
    this.hookUpDragElement = this.hookUpDragElement.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
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

  handleMouseOver(e) {
    this.setState({
      hover: true,
      toolTipPosition: {
        top: e.clientY,
        left: e.clientX,
      },
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
    const {
      top, left, menuOpen, hover, toolTipPosition,
    } = this.state;

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
          onMouseEnter={(e) => this.handleMouseOver(e)}
          onMouseLeave={() => this.setState({ hover: false })}
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
          {hover && <ToolTip text="Accessibility Menu" toolTipPosition={toolTipPosition} />}
          <i className={`fas fa-wheelchair ${Styles.handicapIcon}`} />
        </button>
        <HandicapMenuList
          menuOpen={menuOpen}
        />
      </div>
    );
  }
}

export default Handicap;
