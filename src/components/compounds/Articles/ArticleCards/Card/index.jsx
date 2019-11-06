import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './card.styles.scss';
import truncateText from './Helpers';

export default function Card(props) {
  const {
    article,
    backgroundImage,
    external,
    slug,
  } = props;
  const inlineStyle = {
    background: `no-repeat center center url(${article.imageUrl || backgroundImage})`,
    backgroundSize: 'cover',
  };

  let res = '';

  if (external) {
    res = (
      <a
        href={article.link}
        className={Styles.articleCard}
        style={inlineStyle}
      >
        <div className={Styles.titleWrapper}>
          <h3 className={Styles.articleTitle}>{truncateText(article.title, 30)}</h3>
        </div>
      </a>
    );
  } else {
    res = (
      <Link
        to={`/read/${slug}`}
        className={Styles.articleCard}
        style={inlineStyle}
      >
        <div className={Styles.titleWrapper}>
          <h3 className={Styles.articleTitle}>{truncateText(article.title, 30)}</h3>
        </div>
      </Link>
    );
  }

  return res;
}

Card.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
    slug: PropTypes.string.isRequired,
    external: PropTypes.bool.isRequired,
  }).isRequired,
  backgroundImage: PropTypes.string,
};


Card.defaultProps = {
  backgroundImage: 'https://res.cloudinary.com/iyikuyoro/image/upload/v1551336637/portfolio%20assets/patrick-fore-381200-unsplash.jpg',
};
