import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Styles from './footer.styles.scss';

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <a className={Styles.anchor} href="mailto:opeoluwa.iyikuyoro@gmail.com" aria-label="mail Opeoluwa">
        <FontAwesomeIcon icon="envelope" />
      </a>
      <a className={Styles.anchor} href="https://twitter.com/IyiKuyoro" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
      <a className={Styles.anchor} href="https://www.linkedin.com/in/iyikuyoro/" aria-label="LinkedIn">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </footer>
  );
}
