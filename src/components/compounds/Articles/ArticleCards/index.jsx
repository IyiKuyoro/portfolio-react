import React from 'react';
import PropTypes from 'prop-types';

import Styles from './articleCards.styles.scss';
import Card from './Card';

function generateArticleCards(articles, mouseOver) {
  return articles.map((article) => (
    <Card
      key={article.id}
      article={article}
      background={article.imageUrl}
      mouseOver={mouseOver}
    />
  ));
}

export default function ArticleCards(props) {
  const { articles, mouseOver } = props;

  return (
    <div className={Styles.cardsWrapper}>
      <div className={Styles.cardPadding}>
        {generateArticleCards(articles, mouseOver)}
      </div>
    </div>
  );
}

ArticleCards.propTypes = {
  mouseOver: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
