import React from 'react';
import PropTypes from 'prop-types';

import Styles from './project.styles.scss';

export default function Project(props) {
  const { project, className } = props;

  return (
    <div className={`${className} ${Styles.project}`}>
      <img
        className={Styles.image}
        src={project.imageUrl}
        alt={project.name}
      />
      <div className={Styles.text}>
        <h3 className={Styles.name}>{project.name}</h3>
        <p className={Styles.description}>{project.description}</p>
      </div>
    </div>
  );
}

Project.propTypes = {
  className: PropTypes.string.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
