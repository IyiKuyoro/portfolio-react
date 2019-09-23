import React from 'react';
import PropTypes from 'prop-types';

import Styles from './articleDisplay.styles';

export default function ArticleDisplay(props) {
  const { article } = props;

  const displayStyle = {
    background: `no-repeat center center url(${article.imageUrl})`,
    backgroundSize: 'cover',
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
