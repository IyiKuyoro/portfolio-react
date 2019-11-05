import React, { Component } from 'react';

import Styles from './articles.styles.scss';
import ArticlesList from './ArticlesList.json';
import ArticleCards from './ArticleCards';

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArticleId: 0,
    };
  }

  handleMouseOver(id) {
    this.setState({
      currentArticleId: id,
    });
  }

  render() {
    const { currentArticleId } = this.state;

    return (
      <div className={Styles.articles}>
        <h2 className={Styles.heading}>Did I mention that I Write?</h2>
        <ArticleCards
          currentArticleId={currentArticleId}
          articles={ArticlesList}
          mouseOver={(id) => this.handleMouseOver(id)}
        />
      </div>
    );
  }
}
