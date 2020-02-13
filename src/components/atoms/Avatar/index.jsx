import React from 'react';
import { string, func } from 'prop-types';

import Styles from './avatar.styles.scss';

export default function Avatar(props) {
  const { sizeStyle, handleClick } = props;

  const styleString = `${sizeStyle} ${Styles.avatar}`;
  const image = 'https://res.cloudinary.com/iyikuyoro/image/upload/v1572195552/portfolio-assets/profile-img.png';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styleString}
    >
      <img
        src={image}
        alt="user"
        className={Styles.image}
      />
    </button>
  );
}

Avatar.propTypes = {
  sizeStyle: string.isRequired,
  handleClick: func.isRequired,
};
