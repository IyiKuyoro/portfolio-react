import React, { Component } from 'react';

import Header from 'Components/compounds/Header';
import Hero from 'Components/compounds/Hero';
import Education from 'Components/compounds/Education';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yScroll: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({
      yScroll: window.scrollY,
    });
  }

  render() {
    const { yScroll } = this.state;

    return (
      <div>
        <Header />
        <Hero />
        <Education yScroll={yScroll} />
      </div>
    );
  }
}
