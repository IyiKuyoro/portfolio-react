import React from 'react';
import PropTypes from 'prop-types';

import Styles from './articleCards.styles';
import Card from './Card';

function generateArticleCards(articles) {
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
      />
    );
  });
}

export default function ArticleCards(props) {
  const { articles, currentArticleId } = props;

  return (
    <div className={Styles.cardGroupWrapper}>
      <div className={Styles.cardGroup}>
        {generateArticleCards(articles)}
      </div>
    </div>
  );
}

ArticleCards.propTypes = {
  currentArticleId: PropTypes.number.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
