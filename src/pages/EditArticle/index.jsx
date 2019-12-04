import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArticleService from 'Services/Articles';
import { userLogOut } from 'Actions/authUser';
import Button from 'Atoms/Button';
import Editor from 'Atoms/Editor';
import Header from 'Compounds/Header';
import { saveArticle, getArticle, deleteArticle } from 'IndexDB/articles';
import { Notification, NotificationSeverity } from 'HOC/Notifications';

import ArticleBanner from './ArticleBanner';
import Styles from './editArticle.styles.scss';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    const {
      history: {
        location: { pathname },
      },
      article,
    } = props;
    this.state = ({
      title: article.title,
      articleBannerUrl: article.imageUrl,
      articleImagePublicId: article.imagePublicId,
      body: article.body,
      category: article.category,
      slug: article.slug,
      changed: false,
      errorMessage: '',
      errorSeverity: NotificationSeverity.caution,
      publishedArticle: /\/edit\/.+/.test(pathname),
    });
    this.handleBannerChange = this.handleBannerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.handleArticlePublish = this.handleArticlePublish.bind(this);
    this.handleArticleRepublish = this.handleArticleRepublish.bind(this);
    this.validateArticle = this.validateArticle.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    const {
      history: { location },
    } = this.props;

    if (!/\/edit\/.+/.test(location.pathname)) {
      getArticle()
        .then((article) => {
          if (article) {
            this.setState({
              title: article.title,
              articleBannerUrl: article.articleBannerUrl,
              articleImagePublicId: article.articleImagePublicId,
              body: article.body,
              category: article.category,
            });
          }
        })
        .catch(() => {
          this.setState({
            errorMessage: 'Something went wrong trying to retrieve you last work.',
          });
        });
      setInterval(this.saveArticle, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.saveArticle);
  }

  saveArticle() {
    const {
      changed, title, articleBannerUrl, articleImagePublicId, body, category,
    } = this.state;

    if (changed) {
      this.setState({
        changed: false,
      });
      saveArticle({
        key: 'name',
        title,
        articleBannerUrl,
        articleImagePublicId,
        body,
        category,
      });
    }
  }

  handleBannerChange(newImageUrl, newImagePublicId) {
    this.setState({
      articleBannerUrl: newImageUrl,
      articleImagePublicId: newImagePublicId,
      changed: true,
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
      changed: true,
    });
  }

  handleBodyChange(_, editor) {
    this.setState({
      body: editor.getData(),
      changed: true,
    });
  }

  handleCategoryChange(newCategory) {
    this.setState({
      category: newCategory,
      changed: true,
    });
  }

  handleArticlePublish() {
    const { userData: { token }, history, logUserOut } = this.props;
    const {
      title, articleBannerUrl, articleImagePublicId, body, category,
    } = this.state;

    const article = {
      title,
      category,
      body,
      imageUrl: articleBannerUrl,
      imagePublicId: articleImagePublicId,
    };

    ArticleService.publishArticle(article, token, history, logUserOut)
      .then((res) => {
        if (res.success) {
          deleteArticle();
          history.push(`/read/${res.data.slug}`);
        } else {
          this.setState({
            errorMessage: res.message,
            errorSeverity: NotificationSeverity.error,
          });
        }
      })
      .catch((error) => {
        if (error.message === 'Your session has expired.') {
          logUserOut(history, '/login', '/write', 'Your session has expired.');
        } else {
          this.setState({
            errorMessage: 'Server error',
            errorSeverity: NotificationSeverity.error,
          });
        }
      });
  }

  handleArticleRepublish() {
    const { userData: { token }, history, logUserOut } = this.props;
    const {
      title, articleBannerUrl, articleImagePublicId, body, category, slug,
    } = this.state;

    const article = {
      title,
      category,
      body,
      imageUrl: articleBannerUrl || null,
      imagePublicId: articleImagePublicId || null,
    };

    ArticleService.republishArticle(article, slug, token)
      .then((res) => {
        if (res.success) {
          deleteArticle();
          history.push(`/read/${slug}`);
        } else {
          this.setState({
            errorMessage: 'Oops! Could not publish that...',
            errorSeverity: NotificationSeverity.error,
          });
        }
      })
      .catch((error) => {
        if (error.message === 'Your session has expired.') {
          logUserOut(history, '/login', '/write', 'Your session has expired.');
        } else {
          this.setState({
            errorMessage: 'Server error',
            errorSeverity: NotificationSeverity.error,
          });
        }
      });
  }

  validateArticle() {
    const { title, body } = this.state;

    if (title === '' || body === '') {
      return false;
    }

    return true;
  }

  render() {
    const {
      title, articleBannerUrl, articleImagePublicId,
      body, errorMessage, errorSeverity, category, publishedArticle,
    } = this.state;

    return (
      <>
        <Header />
        <ArticleBanner
          updateBannerUrl={this.handleBannerChange}
          imageUrl={articleBannerUrl}
          imagePublicId={articleImagePublicId}
        />
        <input onChange={this.handleTitleChange} className={Styles.title} type="text" placeholder="Article Title..." value={title} />
        <div className={Styles.articleBody}>
          <Editor body={body} handleBodyChange={this.handleBodyChange} />
        </div>
        {errorMessage
        && <Notification severity={errorSeverity} message={errorMessage} />}
        <div className={Styles.buttons}>
          <input id="tech-btn" onChange={() => this.handleCategoryChange('tech')} className={`${Styles.categoryRadio} ${Styles.tech}`} type="radio" name="category" checked={category === 'tech'} />
          <input id="inspiration-btn" onChange={() => this.handleCategoryChange('inspirational')} className={`${Styles.categoryRadio} ${Styles.inspirational}`} type="radio" name="category" checked={category === 'inspirational'} />
        </div>
        {this.validateArticle()
        && (
        <div className={Styles.buttons}>
          {publishedArticle || <Button handleClick={this.handleArticlePublish} text="Publish" />}
          {publishedArticle && <Button handleClick={this.handleArticleRepublish} text="Republish" />}
          {/* <Button handleClick={this.handleArticleSaveDraft} text="Save Draft" /> */}
        </div>
        )}
      </>
    );
  }
}

EditArticle.defaultProps = {
  article: {
    title: '',
    category: '',
    body: '',
    authors: [],
    authorsIds: [],
    imageUrl: '',
    imagePublicId: '',
    updatedAt: '',
    slug: '',
  },
};

EditArticle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        category: PropTypes.string,
        slug: PropTypes.string,
        imageUrl: PropTypes.string,
        imagePublicId: PropTypes.string,
      }),
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  logUserOut: PropTypes.func.isRequired,
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
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    logUserOut: (history, redirectUrl, previousUrl, errorMessage) => dispatch(
      userLogOut(history, redirectUrl, previousUrl, errorMessage),
    ),
  };
}

function mapStateToProps(state) {
  return ({
    userData: state.authUser.userData,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditArticle));
