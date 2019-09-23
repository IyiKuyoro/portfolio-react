import React from 'react';
import PropTypes from 'prop-types';

import Styles from './card.styles.scss';
import truncateText from './Helpers';

export default function Card(props) {
  const { article, background, mouseOver } = props;
  const inlineStyle = {
    background: `no-repeat center center url(${background})`,
    backgroundSize: 'cover',
    ...article.style,
  };

  return (
    <a
      href={article.url}
      className={Styles.articleCard}
      style={inlineStyle}
      onMouseOver={() => mouseOver(article.id)}
      onFocus={() => mouseOver(article.id)}
    >
      <div className={Styles.titleWrapper}>
        <h3 className={Styles.articleTitle}>{truncateText(article.title, 30)}</h3>
      </div>
    </a>
  );
}

Card.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    style: PropTypes.shape({
      bottom: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  background: PropTypes.string.isRequired,
  mouseOver: PropTypes.func.isRequired,
};
