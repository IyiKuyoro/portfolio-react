import React from 'react';
import PropTypes from 'prop-types';
import TimePast from 'time_past';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from 'Atoms/Button';
import Header from 'Compounds/Header';
import Disqus from 'Compounds/Disqus';
import Styles from './article.styles.scss';

function canEdit(authorsIds, id) {
  return authorsIds.indexOf(id) >= 0;
}

function handleEditArticle(article, history) {
  history.push('/write', article);
}

function Article(props) {
  const {
    article: {
      title,
      authors,
      authorsIds,
      updatedAt,
      body,
      imageUrl,
      slug,
    },
    article,
    userData: { id },
    history,
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
      {canEdit(authorsIds, id) && <Button style={Styles.btn} text="Edit" handleClick={() => handleEditArticle(article, history)} />}
      {imageUrl && <img className={Styles.image} src={imageUrl} alt="article banner" />}
      <h2 className={Styles.title}>{title}</h2>
      <p className={Styles.authors}>{authorsString}</p>
      <p className={Styles.time}>{TimePast.inWords(updatedAt)}</p>
      <div className={Styles.body}>
        <CKEditor
          editor={BalloonEditor}
          data={body}
          disabled
        />
      </div>
      <Disqus title={title} slug={slug} />
    </div>
  );
}

Article.defaultProps = {
  userData: {
    id: -1,
  },
};

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    authorsIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    imageUrl: PropTypes.string,
    imagePublicId: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
  }),
  history: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return ({
    userData: state.authUser.userData,
  });
}

export default connect(mapStateToProps)(withRouter(Article));
