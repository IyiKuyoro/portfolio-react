import React, { Component } from 'react';

import Styles from './hero.styles.scss';
import stacks from './StackList.json';

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStack: 0,
    };
    this.animationInterval = undefined;
  }

  componentDidMount() {
    this.hookupShuffling();
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
  }

  hookupShuffling() {
    this.animationInterval = setInterval(() => {
      const { currentStack } = this.state;

      if (currentStack === stacks.length - 1) {
        this.setState({
          currentStack: 0,
        });
      } else {
        this.setState({
          currentStack: currentStack + 1,
        });
      }
    }, 1000);
  }

  render() {
    const { currentStack } = this.state;

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
        <img
          onMouseOver={() => clearInterval(this.animationInterval)}
          onFocus={() => clearInterval(this.animationInterval)}
          onMouseLeave={() => this.hookupShuffling()}
          className={Styles.langImage}
          src={stacks[currentStack].imageUrl}
          alt={stacks[currentStack].name}
        />
      </div>
    );
  }
}
