import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';
import PropTypes from 'prop-types';

import Button from 'Atoms/Button';
import Header from 'Compounds/Header';
import { saveArticle, getArticle } from 'IndexDB/articles';
import { Notification, NotificationSeverity } from 'HOC/Notifications';
import ArticleBanner from './ArticleBanner';

import Styles from './editArticle.styles.scss';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      title: '',
      articleBannerUrl: '',
      articleImagePublicId: '',
      body: '',
      changed: false,
      errorMessage: '',
    });
    this.handleBannerChange = this.handleBannerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.handleArticlePublish = this.handleArticlePublish.bind(this);
    this.handleArticleSaveDraft = this.handleArticleSaveDraft.bind(this);
    this.validateArticle = this.validateArticle.bind(this);
  }

  componentWillMount() {
    getArticle()
      .then((article) => {
        if (article) {
          this.setState({
            title: article.title,
            articleBannerUrl: article.articleBannerUrl,
            articleImagePublicId: article.articleImagePublicId,
            body: article.body,
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

  componentWillUnmount() {
    clearInterval(this.saveArticle);
  }

  saveArticle() {
    const {
      changed, title, articleBannerUrl, articleImagePublicId, body,
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

  handleArticlePublish(event) {

  }

  handleArticleSaveDraft(event) {

  }

  validateArticle() {
    const { title, body } = this.state;

    if (title === '' || body === '') {
      return false;
    }

    return true;
  }

  render() {
    function imagePluginFactory(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new CloudinaryImageUploadAdapter(loader, 'iyikuyoro', 'example');
    }

    const {
      title, articleBannerUrl, articleImagePublicId, body, errorMessage,
    } = this.state;
    const config = {
      extraPlugins: [imagePluginFactory],
    };

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
          <CKEditor
            editor={BalloonEditor}
            data={body}
            onChange={this.handleBodyChange}
            config={config}
          />
        </div>
        {errorMessage
        && <Notification severity={NotificationSeverity.caution} message={errorMessage} />}
        {this.validateArticle()
        && (
        <>
          <Button handleClick={this.handleArticlePublish} text="Publish" />
          <Button handleClick={this.handleArticleSaveDraft} text="Save Draft" />
        </>
        )}
      </>
    );
  }
}

EditArticle.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(EditArticle);
