import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';
import PropTypes from 'prop-types';

import ImageService from 'Services/Image';
import Header from 'Compounds/Header';
import { saveArticle } from 'IndexDB/articles';
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
      newArticle: true,
      changed: false,
    });
    this.handleBannerChange = this.handleBannerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  componentWillMount() {
    setInterval(this.saveArticle, 10000);
  }


  componentWillUnmount() {
    const { articleImagePublicId, newArticle } = this.state;

    if (articleImagePublicId && newArticle) {
      ImageService.deleteImage(articleImagePublicId);
    }
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

  render() {
    function imagePluginFactory(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new CloudinaryImageUploadAdapter(loader, 'iyikuyoro', 'example');
    }

    const {
      title, articleBannerUrl, articleImagePublicId, body,
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
      </>
    );
  }
}

EditArticle.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(EditArticle);
