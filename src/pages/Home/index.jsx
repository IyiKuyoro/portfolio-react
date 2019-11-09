import React, { Component } from 'react';

import Header from 'Components/compounds/Header';
import Hero from 'Components/compounds/Hero';
import Education from 'Components/compounds/Education';
import Projects from 'Components/compounds/Projects';
import Articles from 'Components/compounds/Articles';
import Video from 'Components/compounds/Video';
import Footer from 'Components/compounds/Footer';
import UserMenu from 'Components/compounds/UserMenu';

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
        <UserMenu />
        <Hero />
        <Education yScroll={yScroll} />
        <Projects />
        <Articles />
        <Video />
        <Footer />
      </div>
    );
  }
}
