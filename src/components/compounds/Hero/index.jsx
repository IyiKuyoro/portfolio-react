import React, { Component } from 'react';

import Styles from './hero.styles';

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={Styles.hero}>
        <div className={Styles.hero_text}>
          <p>
            Hi, I am
            <span className={Styles.name}> Opeoluwa Iyi-Kuyoro</span>
            !
          </p>
          <p>
            {'I build web apps and write about the same for a living.'
            + ' Scroll down to get to know me a bit better'}
          </p>
        </div>
      </div>
    );
  }
}
