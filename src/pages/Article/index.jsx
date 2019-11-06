import React from 'react';
import PropTypes from 'prop-types';
import TimePast from 'time_past';
import CKEditor from '@ckeditor/ckeditor5-react';
import BallonEditor from '@ckeditor/ckeditor5-build-balloon';

import Header from 'Components/compounds/Header';
import Styles from './article.styles.scss';

function Article(props) {
  const {
    article: {
      title,
      authors,
      updatedAt,
      body,
      imageUrl,
    },
  } = props;

  const authorsString = authors.reduce((acc, name, i) => {
    let res = '';

    if (i === 0) {
      res = (`${name}`);
    } else if (i < authors.length - 1) {
      res = (`${acc}, ${name}`);
    } else {
      res = (`${acc} and ${name}`);
    }

    return res;
  }, '').trim();

  return (
    <div>
      <Header />
      {imageUrl && <img className={Styles.image} src={imageUrl} alt="article banner" />}
      <h2 className={Styles.title}>{title}</h2>
      <p className={Styles.authors}>{authorsString}</p>
      <p className={Styles.time}>{TimePast.inWords(updatedAt)}</p>
      <div className={Styles.body}>
        <CKEditor
          editor={BallonEditor}
          data={body}
          disabled
        />
      </div>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    imageUrl: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
