/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { addNotification } from 'Actions/notifications';
import ImageService from 'Services/Image';

import Styles from './articleBanner.styles.scss';

class ArticleBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
  }

  handleImageDelete() {
    const { updateBannerUrl, imagePublicId, addNotificationMessage } = this.props;

    this.setState({
      loading: true,
    });

    this.imageDeleteSubscription = ImageService.deleteImage(imagePublicId)
      .pipe(
        map((res) => res.response),
        catchError((error) => {
          addNotificationMessage('Could not delete this image...');
          this.setState({
            loading: false,
          });
          return of(error);
        }),
      )
      .subscribe(() => {
        this.setState({
          loading: false,
        });
        updateBannerUrl('', '');
      });
  }

  handleUpload(file) {
    const { updateBannerUrl, addNotificationMessage } = this.props;

    this.imageUploadSubscription = ImageService.uploadImage(file)
      .pipe(
        map((res) => res.response),
        catchError((error) => {
          addNotificationMessage('Sorry, could not upload image.');
          this.setState({
            loading: false,
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
    const { loading } = this.state;
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
        { !imageUrl && !loading && <label htmlFor="image"><FontAwesomeIcon className="Styles.uploadImage" icon="image" /></label> }
        { !imageUrl || (
        <FontAwesomeIcon
          onClick={this.handleImageDelete}
          onKeyPress={this.handleImageDelete}
          className="Styles.deleteImage"
          icon="trash-alt"
          role="button"
          tabIndex="0"
        />
        ) }
        { !imageUrl || <img className={Styles.image} src={imageUrl} alt="article banner" /> }
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
  addNotificationMessage: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    addNotificationMessage: (message) => dispatch(addNotification(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleBanner);
