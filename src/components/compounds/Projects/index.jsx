import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Project from './Project';
import Styles from './projects.styles.scss';
import ProjectList from './ProjectsList.json';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.projectInterval = null;
    this.state = {
      currentId: 0,
      projectClassList: [],
      animate: true,
    };
    this.handleChangeButtonClick = this.handleChangeButtonClick.bind(this);
    this.changeProjectAtIntervals = this.changeProjectAtIntervals.bind(this);
  }

  componentDidMount() {
    this.changeProjectAtIntervals();
  }

  componentWillUnmount() {
    clearInterval(this.projectInterval);
  }

  // Hooks up the changing of projects at a 6 secs interval
  changeProjectAtIntervals() {
    this.projectInterval = setInterval(() => {
      this.nextProject();
    }, 6000);
  }

  // Slides the old project out of the screen
  slideProjectOut(forward) {
    this.setState({
      projectClassList: [(forward ? Styles.removeProject : Styles.removeProjectRight)],
    });
  }

  // Slides a new project onto the screen
  slideProjectIn(forward) {
    setTimeout(() => {
      this.setState({
        projectClassList: [(forward ? Styles.addProject : Styles.addProjectRight)],
      });
    }, 1000);
  }

  // Change the displayed project
  changeProject(forward = true) {
    setTimeout(() => {
      const { currentId } = this.state;
      if (currentId === (forward ? ProjectList.length - 1 : 0)) {
        this.setState({
          currentId: forward ? 0 : ProjectList.length - 1,
        });
      } else {
        this.setState({
          currentId: forward ? currentId + 1 : currentId - 1,
        });
      }
    }, 600);
  }

  nextProject(forward = true, clicked = false) {
    const { animations } = this.props;
    const { animate } = this.state;

    if (clicked || (animations && animate)) {
      // Pull project off screen
      this.slideProjectOut(forward);

      // Change Project
      this.changeProject(forward);

      // Bring project back
      this.slideProjectIn(forward);
    }
  }

  // Reset the project switching interval
  resetInterval() {
    clearInterval(this.projectInterval);
    this.projectInterval = setInterval(() => {
      this.nextProject();
    }, 6000);
  }

  // Handle project change button click
  handleChangeButtonClick(forward = true) {
    this.nextProject(forward, true);
    this.resetInterval();
  }

  render() {
    const { currentId, projectClassList } = this.state;
    const projectClassString = projectClassList.join(' ');

    return (
      <section
        aria-label="projects region"
        aria-roledescription="carousel"
        className={Styles.projects}
        onMouseOver={() => this.setState({ animate: false })}
        onFocus={() => this.setState({ animate: false })}
        onMouseLeave={() => this.setState({ animate: true })}
      >
        <button
          className={`${Styles.btn} ${Styles.leftBtn}`}
          onClick={() => this.handleChangeButtonClick(false)}
          type="button"
          aria-label="projects previous slide"
        >
          {}
        </button>
        <h2 className={Styles.heading}>See some of my open source projects</h2>
        <Project className={projectClassString} project={ProjectList[currentId]} />
        <button
          className={`${Styles.btn} ${Styles.rightBtn}`}
          onClick={this.handleChangeButtonClick}
          type="button"
          aria-label="projects next slide"
        >
          {}
        </button>
        <a href="https://github.com/IyiKuyoro" className={Styles.link}>...psst there is more on GitHub</a>
      </section>
    );
  }
}

Projects.propTypes = {
  animations: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return ({
    animations: state.a11y.animations,
  });
}

export default connect(mapStateToProps)(Projects);
