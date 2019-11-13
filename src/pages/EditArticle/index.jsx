import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';

import Header from 'Compounds/Header';
import ArticleBanner from './ArticleBanner';

import Styles from './editArticle.styles.scss';

export default class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      title: '',
      articleBannerUrl: '',
      body: '',
    });
    this.handleBannerChange = this.handleBannerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleBannerChange(newImageUrl) {
    this.setState({
      articleBannerUrl: newImageUrl,
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleBodyChange(event, editor) {
    this.setState({
      body: editor.getData(),
    });
  }

  render() {
    function imagePluginFactory(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new CloudinaryImageUploadAdapter(loader, 'iyikuyoro', 'example');
    }

    const { title, articleBannerUrl, body } = this.state;
    const config = {
      extraPlugins: [imagePluginFactory],
    };

    return (
      <>
        <Header />
        <ArticleBanner updateBannerUrl={this.handleBannerChange} imageUrl={articleBannerUrl} />
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
