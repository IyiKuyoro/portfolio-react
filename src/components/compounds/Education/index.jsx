import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './education.styles.scss';
import EduList from './EducationList.json';

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
      textClassList: [Styles.textWrapper],
      iconClassList: [Styles.iconWrapper],
    };
    this.interval1 = undefined;
    this.interval2 = undefined;
    this.timeout = undefined;
    this.stopAnimation = this.stopAnimation.bind(this);
    this.animateText = this.animateText.bind(this);
  }

  componentDidMount() {
    this.animateText();
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  animateText() {
    this.interval1 = setInterval(() => {
      this.setState({
        textClassList: [Styles.textWrapper],
        iconClassList: [Styles.iconWrapper],
      });
    }, 3000);

    // Change text
    this.interval2 = setInterval(() => {
      const { currentId } = this.state;
      // Run change text animation
      this.setState({
        textClassList: [Styles.textWrapper, Styles.addAnimation],
        iconClassList: [Styles.iconWrapper, Styles.addIconAnimation],
      });

      this.timeout = setTimeout(() => {
        if (currentId === 2) {
          this.setState({
            currentId: 0,
          });
        } else {
          this.setState({
            currentId: currentId + 1,
          });
        }
      }, 500);
    }, 4000);
  }

  stopAnimation() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearTimeout(this.timeout);
  }

  render() {
    const { yScroll } = this.props;
    const { currentId, textClassList, iconClassList } = this.state;
    let pStyle = {
      height: 0,
    };

    const textClassString = textClassList.join(' ');
    const iconClassString = iconClassList.join(' ');

    if (yScroll >= 100 && yScroll < 465) {
      // Change size as you scroll
      pStyle = {
        height: (yScroll - 100),
      };
    } else if (yScroll >= 465) {
      // Change size as you scroll
      pStyle = {
        height: 364,
      };
    }

    return (
      <div
        className={Styles.education}
        onMouseEnter={this.stopAnimation}
        onFocus={this.stopAnimation}
        onMouseLeave={this.animateText}
      >
        <div className={Styles.content} style={pStyle}>
          <div className={iconClassString}>
            <i className={`fas ${EduList[currentId].icon} ${Styles.icon}`} />
          </div>
          <div className={textClassString}>
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
