import React from 'react';
import Button from 'Atoms/Button';

import Styles from './header.styles';

export default function Header() {
  return (
    <div className={Styles.header}>
      <div className={Styles.headerWrapper}>
        <h1 className={Styles.title}>Opeoluwa Iyi-Kuyoro</h1>
        <Button />
      </div>
    </div>
  );
}
