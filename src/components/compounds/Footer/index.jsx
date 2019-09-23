import React from 'react';

import Styles from './footer.styles.scss';

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <p className={Styles.text}>
        <strong>Email</strong>
        : opeoluwa.iyikuyoro@gmail.com
      </p>
      <p className={Styles.text}>
        <strong>Twitter</strong>
        <a className={Styles.anchor} href="https://twitter.com/IyiKuyoro">: @iyikuyoro</a>
      </p>
      <p className={Styles.text}>
        <strong>LinkedIn</strong>
        <a className={Styles.anchor} href="https://www.linkedin.com/in/iyikuyoro/">: Iyi-Kuyoro</a>
      </p>
    </footer>
  );
}
