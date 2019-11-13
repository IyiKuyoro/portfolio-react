/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import ImageService from 'Services/Image';
import { Notification, NotificationSeverity } from 'HOC/Notifications';

import Styles from './articleBanner.styles.scss';

export default class ArticleBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noImage: true,
      imageUrl: '',
      uploading: false,
      errorMessage: '',
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(file) {
    ImageService.uploadImage(file)
      .then((res) => {
        this.setState({
          noImage: false,
          uploading: false,
          imageUrl: res.data.imageUrl,
        });
      })
      .catch(() => {
        this.setState({
          uploading: false,
          errorMessage: 'Sorry, could not upload image',
        });
      });
  }

  render() {
    const {
      noImage, imageUrl, uploading, errorMessage,
    } = this.state;

    return (
      <div className={Styles.imageContainer}>
        <input
          id="image"
          className={Styles.imageInput}
          type="file"
          tabIndex="-1"
          onChange={(e) => {
            this.setState({
              uploading: true,
            });
            this.handleUpload(e.target.files[0]);
          }}
        />
        { uploading && <div className={Styles.loader}><div className={Styles.loadingBar} /></div>}
        { noImage && !uploading && <label htmlFor="image"><i className={`fas fa-image ${Styles.uploadImage}`} /></label> }
        { noImage || <i className={`fas fa-trash-alt ${Styles.deleteImage}`} /> }
        { noImage || <img className={Styles.image} src={imageUrl} alt="article banner" /> }
        {errorMessage && <Notification severity={NotificationSeverity.error} message="Error uploading image..." />}
      </div>
    );
  }
}
