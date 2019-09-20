import React, { Component } from 'react';

import Styles from './projects.styles';

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={Styles.projects}>
        <button className={Styles.btn} type="button"> </button>
        <h2 className={Styles.heading}>See some of my open source projects</h2>
        <button className={`${Styles.btn} ${Styles.btnRight}`} type="button"> </button>
      </div>
    );
  }
}
