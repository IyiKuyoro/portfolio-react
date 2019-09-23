import React from 'react';
import PropTypes from 'prop-types';

import Styles from './articleDisplay.styles.scss';

export default function ArticleDisplay(props) {
  const { article } = props;

  const displayStyle = {
    background: `url(${article.imageUrl}) center center / cover no-repeat`,
  };

  return (
    <div
      style={displayStyle}
      className={Styles.displayedArticleCard}
    >
      <a
        className={Styles.displayedArticleTitle}
        href={article.url}
      >
        {article.title}
      </a>
    </div>
  );
}

ArticleDisplay.propTypes = {
  article: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
