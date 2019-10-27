import React from 'react';
import PropTypes from 'prop-types';

import Styles from './avatar.styles.scss';

export default function Avatar(props) {
  const { sizeStyle } = props;

  const styleString = `${sizeStyle} ${Styles.avatar}`;
  const image = 'https://res.cloudinary.com/iyikuyoro/image/upload/v1572195552/portfolio-assets/profile-img.png';

  return (
    <img src={image} alt="user" className={styleString} />
  );
}

Avatar.propTypes = {
  sizeStyle: PropTypes.string.isRequired,
};
