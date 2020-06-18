import React from 'react';
import PropTypes from 'prop-types';

import Styles from './project.styles.scss';

export default function Project(props) {
  const { project, className } = props;

  return (
    <a
      href={project.link}
      className={`${className} ${Styles.project}`}
      aria-roledescription="slide"
      aria-labelledby="project-slide"
    >
      <img
        className={Styles.image}
        src={project.imageUrl}
        alt={project.imagealt}
      />
      <div className={Styles.text}>
        <h3 id="project-slide" className={Styles.name}>{project.name}</h3>
        <p className={Styles.description}>{project.description}</p>
      </div>
    </a>
  );
}

Project.propTypes = {
  className: PropTypes.string.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imagealt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};
