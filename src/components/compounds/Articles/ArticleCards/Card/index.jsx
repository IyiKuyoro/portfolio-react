import React from 'react';
import {
  shape,
  string,
  number,
  bool,
} from 'prop-types';
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
  article: shape({
    id: number.isRequired,
    title: string.isRequired,
    imageUrl: string,
    link: string,
    slug: string.isRequired,
    external: bool.isRequired,
  }).isRequired,
  backgroundImage: string,
};


Card.defaultProps = {
  backgroundImage: 'https://res.cloudinary.com/iyikuyoro/image/upload/v1577840819/portfolio-assets/patrick-fore-381200-unsplash.jpg',
};
