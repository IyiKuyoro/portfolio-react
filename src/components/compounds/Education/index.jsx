import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './education.styles';
import EduList from './EducationList.json';

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
      classList: [Styles.textWrapper],
    };
  }

  componentDidMount() {
    // Remove add text animation
    this.animateText();
  }

  animateText() {
    setInterval(() => {
      this.setState({
        classList: [Styles.textWrapper],
      });
    }, 3000);

    // Change text
    setInterval(() => {
      const { currentId } = this.state;
      // Run change text animation
      this.setState({
        classList: [Styles.textWrapper, Styles.addAnimation],
      });
      if (currentId === 2) {
        this.setState({
          currentId: 0,
        });
      } else {
        this.setState({
          currentId: currentId + 1,
        });
      }
    }, 4000);
  }

  render() {
    const { yScroll } = this.props;
    const { currentId, classList } = this.state;
    let pStyle = {
      height: 0,
    };

    const classString = classList.join(' ');

    if (yScroll >= 100) {
      // Change size as you scroll
      pStyle = {
        height: (yScroll - 100),
      };
    }

    return (
      <div className={Styles.education}>
        <div className={Styles.content} style={pStyle}>
          <div className={classString}>
            <p className={Styles.text}>{EduList[currentId].text}</p>
          </div>
        </div>
      </div>
    );
  }
}

Education.propTypes = {
  yScroll: PropTypes.number.isRequired,
};
