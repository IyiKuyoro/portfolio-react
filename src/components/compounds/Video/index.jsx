import React from 'react';

import Styles from './video.styles';

export default function Video() {
  return (
    <div className={Styles.container}>
      <div className={Styles.padding}>
        <iframe className={Styles.video} title="Tiddy Video" src="https://www.youtube.com/embed/mpZlqv3glog" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        <div className={Styles.videoText}>
          <h2 className={Styles.title}>Before you go, let me Introduce you to Tiddy</h2>
          <p className={Styles.message}>
            {'I built Tiddy because I got tired of telling people to post their'
            + ' slack messages in the right channel for record and neatness sake.'}
          </p>
        </div>
      </div>
    </div>
  );
}
