/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageService from 'Services/Image';
import { Notification, NotificationSeverity } from 'HOC/Notifications';

import Styles from './articleBanner.styles.scss';

export default class ArticleBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noImage: true,
      imageUrl: '',
      loading: false,
      errorMessage: '',
      imagePublicId: '',
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
  }

  handleImageDelete() {
    const { imagePublicId } = this.state;
    const { updateBannerUrl } = this.props;

    this.setState({
      loading: true,
      errorMessage: '',
    });

    ImageService.deleteImage(imagePublicId)
      .then((res) => {
        if (res.success) {
          this.setState({
            loading: false,
            imagePublicId: '',
            imageUrl: '',
            noImage: true,
            errorMessage: '',
          });
          updateBannerUrl('');
        } else {
          throw Error('Error deleting');
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          errorMessage: 'Could not delete this image...',
        });
      });
  }

  handleUpload(file) {
    const { updateBannerUrl } = this.props;

    ImageService.uploadImage(file)
      .then((res) => {
        if (res.success) {
          this.setState({
            noImage: false,
            loading: false,
            imageUrl: res.data.imageUrl,
            imagePublicId: res.data.publicId,
          });
          updateBannerUrl(res.data.imageUrl);
        } else {
          throw Error('Error uploading');
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          errorMessage: 'Sorry, could not upload image.',
        });
      });
  }

  render() {
    const {
      noImage, imageUrl, loading, errorMessage,
    } = this.state;

    return (
      <div className={Styles.imageContainer}>
        <input
          id="image"
          className={Styles.imageInput}
          type="file"
          accept="image/*"
          tabIndex="-1"
          onChange={(e) => {
            this.setState({
              loading: true,
            });
            this.handleUpload(e.target.files[0]);
          }}
        />
        { loading && <div className={Styles.loader}><div className={Styles.loadingBar} /></div>}
        { noImage && !loading && <label htmlFor="image"><i className={`fas fa-image ${Styles.uploadImage}`} /></label> }
        { noImage || (
        <i
          onClick={this.handleImageDelete}
          onKeyPress={this.handleImageDelete}
          role="button"
          tabIndex="0"
          className={`fas fa-trash-alt ${Styles.deleteImage}`}
        />
        ) }
        { noImage || <img className={Styles.image} src={imageUrl} alt="article banner" /> }
        {errorMessage
        && <Notification severity={NotificationSeverity.error} message={errorMessage} />}
      </div>
    );
  }
}

ArticleBanner.propTypes = {
  updateBannerUrl: PropTypes.func.isRequired,
};
