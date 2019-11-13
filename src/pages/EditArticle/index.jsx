import React, { Component } from 'react';

import Header from 'Compounds/Header';
import ArticleBanner from './ArticleBanner';

import Styles from './editArticle.styles.scss';

export default class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      title: '',
      articleBannerUrl: '',
    });
    this.handleBannerChange = this.handleBannerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleBannerChange(newImageUrl) {
    this.setState({
      articleBannerUrl: newImageUrl,
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  render() {
    const { title, articleBannerUrl } = this.state;

    return (
      <>
        <Header />
        <ArticleBanner updateBannerUrl={this.handleBannerChange} imageUrl={articleBannerUrl} />
        <input onChange={this.handleTitleChange} className={Styles.title} type="text" placeholder="Article Title..." value={title} />
      </>
    );
  }
}
