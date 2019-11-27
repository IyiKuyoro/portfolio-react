import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';
import { withRouter } from 'react-router-dom';
import CodeSnippet from 'ckeditor-code-snippet-plugin/dist/codesnippet';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Table from '@ckeditor/ckeditor5-table/src/table';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import ArticleService from 'Services/Articles';
import Button from 'Atoms/Button';
import Header from 'Compounds/Header';
import { saveArticle, getArticle, deleteArticle } from 'IndexDB/articles';
import { Notification, NotificationSeverity } from 'HOC/Notifications';

import ArticleBanner from './ArticleBanner';
import Styles from './editArticle.styles.scss';
import config from '../../config';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    const { state } = props.history.location;
    this.state = ({
      title: state ? state.title : '',
      articleBannerUrl: state ? state.imageUrl : '',
      articleImagePublicId: state ? state.imagePublicId : '',
      body: state ? state.body : '',
      category: state ? state.category : '',
      slug: state ? state.slug : '',
      changed: false,
      errorMessage: '',
      errorSeverity: NotificationSeverity.caution,
      publishedArticle: !!state,
    });
    this.handleBannerChange = this.handleBannerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.handleArticlePublish = this.handleArticlePublish.bind(this);
    this.handleArticleRepublish = this.handleArticleRepublish.bind(this);
    // this.handleArticleSaveDraft = this.handleArticleSaveDraft.bind(this);
    this.validateArticle = this.validateArticle.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
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

  componentWillUnmount() {
    clearInterval(this.saveArticle);
  }

  saveArticle() {
    const {
      changed, title, articleBannerUrl, articleImagePublicId, body, category, publishedArticle,
    } = this.state;

    if (changed && !publishedArticle) {
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
    const { userData: { token }, history } = this.props;
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

    ArticleService.publishArticle(article, token)
      .then((res) => {
        if (res.success) {
          deleteArticle();
          history.push(`/read/${res.data.slug}`);
        } else {
          this.setState({
            errorMessage: 'Oops! Could not publish that...',
            errorSeverity: NotificationSeverity.error,
          });
        }
      })
      .catch(() => {
        this.setState({
          errorMessage: 'Oops! Could not publish that...',
        });
      });
  }

  handleArticleRepublish() {
    const { userData: { token }, history } = this.props;
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
      .catch(() => {
        this.setState({
          errorMessage: 'Oops! Could not publish that...',
        });
      });
  }

  // handleArticleSaveDraft(event) {

  // }

  validateArticle() {
    const { title, body } = this.state;

    if (title === '' || body === '') {
      return false;
    }

    return true;
  }

  render() {
    function imagePluginFactory(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new CloudinaryImageUploadAdapter(loader, 'iyikuyoro', config.imageUploadPreset);
    }

    const {
      title, articleBannerUrl, articleImagePublicId,
      body, errorMessage, errorSeverity, category, publishedArticle,
    } = this.state;
    const editorConfig = {
      plugins: [Essentials, Bold, Italic, Link, Paragraph, CodeSnippet, FileRepository, Heading, List, Indent, Image, ImageUpload, BlockQuote, Table],
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'insertTable', '|', 'indent', 'imageTextAlternative', 'imageUpload', 'blockQuote', 'codeSnippet', '|', 'undo', 'redo'],
      styles: ['full', 'alignLeft', 'alignRight'],
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
            config={editorConfig}
          />
        </div>
        {errorMessage
        && <Notification severity={errorSeverity} message={errorMessage} />}
        <div className={Styles.buttons}>
          <input onChange={() => this.handleCategoryChange('tech')} className={`${Styles.categoryRadio} ${Styles.tech}`} type="radio" name="category" checked={category === 'tech'} />
          <input onChange={() => this.handleCategoryChange('inspirational')} className={`${Styles.categoryRadio} ${Styles.inspirational}`} type="radio" name="category" checked={category === 'inspirational'} />
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

EditArticle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    token: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return ({
    userData: state.authUser.userData,
  });
}

export default connect(mapStateToProps)(withRouter(EditArticle));
