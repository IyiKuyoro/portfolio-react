import React from 'react';
import Button from 'Atoms/Button';

import Styles from './header.styles.scss';

function handleGetCV() {
  window.location = 'https://iyikuyoro-be.herokuapp.com/api/v1/files/cv';
}

export default function Header() {
  return (
    <div className={Styles.header}>
      <div className={Styles.headerWrapper}>
        <h1 className={Styles.title}>Opeoluwa Iyi-Kuyoro</h1>
        <Button handleClick={handleGetCV} />
      </div>
    </div>
  );
}
