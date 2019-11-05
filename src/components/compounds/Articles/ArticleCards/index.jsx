import React from 'react';
import PropTypes from 'prop-types';

import Styles from './articleCards.styles.scss';
import Card from './Card';

function generateArticleCards(articles) {
  return articles.map((article) => (
    <Card
      key={article.id}
      article={article}
      background={article.imageUrl}
      external={article.external}
      slug={article.slug}
    />
  ));
}

export default function ArticleCards(props) {
  const { articles } = props;

  return (
    <div className={Styles.cardsWrapper}>
      <div className={Styles.cardPadding}>
        {generateArticleCards(articles)}
      </div>
    </div>
  );
}

ArticleCards.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
    slug: PropTypes.string.isRequired,
    external: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
};
