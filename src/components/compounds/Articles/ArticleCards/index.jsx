import React from 'react';
import PropTypes from 'prop-types';

import Styles from './articleCards.styles.scss';
import Card from './Card';

function generateArticleCards(articles, mouseOver) {
  return articles.map((article) => {
    const style = {
      left: `${30 * (article.id)}px`,
      bottom: `${30 * (article.id)}px`,
    };
    Object.assign(article, { style });

    return (
      <Card
        key={article.id}
        article={article}
        background={article.imageUrl}
        mouseOver={mouseOver}
      />
    );
  });
}

export default function ArticleCards(props) {
  const { articles, mouseOver } = props;

  return (
    <div className={Styles.cardGroupWrapper}>
      <div className={Styles.cardGroup}>
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
