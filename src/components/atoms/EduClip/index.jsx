import React from 'react';
import { string } from 'prop-types';

export default function EduClip(props) {
  const { text } = props;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

EduClip.propTypes = {
  text: string.isRequired,
};
