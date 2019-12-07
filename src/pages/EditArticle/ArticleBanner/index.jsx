/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import ImageService from 'Services/Image';
import { Notification, NotificationSeverity } from 'HOC/Notifications';

import Styles from './articleBanner.styles.scss';

export default class ArticleBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: '',
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
  }

  handleImageDelete() {
    const { updateBannerUrl, imagePublicId } = this.props;

    this.setState({
      loading: true,
      errorMessage: '',
    });

    this.imageDeleteSubscription = ImageService.deleteImage(imagePublicId)
      .pipe(
        map((res) => res.response),
        catchError((error) => {
          this.setState({
            loading: false,
            errorMessage: 'Could not delete this image...',
          });
          return of(error);
        }),
      )
      .subscribe(() => {
        this.setState({
          loading: false,
          errorMessage: '',
        });
        updateBannerUrl('', '');
      });
  }

  handleUpload(file) {
    const { updateBannerUrl } = this.props;

    this.imageUploadSubscription = ImageService.uploadImage(file)
      .pipe(
        map((res) => res.response),
        catchError((error) => {
          this.setState({
            loading: false,
            errorMessage: 'Sorry, could not upload image.',
          });
          return of(error);
        }),
      )
      .subscribe((res) => {
        this.setState({
          loading: false,
        });
        updateBannerUrl(res.data.imageUrl, res.data.publicId);
      });
  }

  render() {
    const {
      loading, errorMessage,
    } = this.state;
    const { imageUrl } = this.props;

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
        { !imageUrl && !loading && <label htmlFor="image"><i className={`fas fa-image ${Styles.uploadImage}`} /></label> }
        { !imageUrl || (
        <i
          onClick={this.handleImageDelete}
          onKeyPress={this.handleImageDelete}
          role="button"
          tabIndex="0"
          className={`fas fa-trash-alt ${Styles.deleteImage}`}
        />
        ) }
        { !imageUrl || <img className={Styles.image} src={imageUrl} alt="article banner" /> }
        {errorMessage
        && <Notification severity={NotificationSeverity.error} message={errorMessage} />}
      </div>
    );
  }
}

ArticleBanner.defaultProps = {
  imageUrl: '',
  imagePublicId: '',
};

ArticleBanner.propTypes = {
  updateBannerUrl: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  imagePublicId: PropTypes.string,
};
