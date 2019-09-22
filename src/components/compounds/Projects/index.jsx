import React, { Component } from 'react';

import Project from './Project';
import Styles from './projects.styles';
import ProjectList from './ProjectsList.json';

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
      projectClassList: [],
    };
  }

  componentDidMount() {
    // this.removeClassAtIntervals();
    this.changeProjectAtIntervals();
  }

  changeProjectAtIntervals() {
    setInterval(() => {
      // Pull project off screen
      this.slideProjectOut();

      // Change Project
      this.changeProject();

      // Bring project back
      this.slideProjectIn();
    }, 6000);
  }

  slideProjectOut() {
    this.setState({
      projectClassList: [Styles.removeProject],
    });
  }

  slideProjectIn() {
    setTimeout(() => {
      this.setState({
        projectClassList: [Styles.addProject],
      });
    }, 1000);
  }

  changeProject() {
    setTimeout(() => {
      const { currentId } = this.state;
      if (currentId === ProjectList.length - 1) {
        this.setState({
          currentId: 0,
        });
      } else {
        this.setState({
          currentId: currentId + 1,
        });
      }
    }, 500);
  }

  render() {
    const { currentId, projectClassList } = this.state;
    const projectClassString = projectClassList.join(' ');

    return (
      <div className={Styles.projects}>
        <button className={Styles.btn} type="button"> </button>
        <h2 className={Styles.heading}>See some of my open source projects</h2>
        <Project className={projectClassString} project={ProjectList[currentId]} />
        <button className={`${Styles.btn} ${Styles.btnRight}`} type="button"> </button>
        <a href="https://github.com/IyiKuyoro" className={Styles.link}>...psst there is more on GitHub</a>
      </div>
    );
  }
}
