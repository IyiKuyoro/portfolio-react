import React from 'react';
import DisqusComment from 'disqus-react';
import PropTypes from 'prop-types';

import Styles from './disqus.styles.scss';

export default function Disqus(props) {
  const { title, slug } = props;

  const disqusShortname = 'iyikuyoro';
  const disqusConfig = {
    url: window.location.href,
    identifier: slug,
    title,
  };

  return (
    <div className={Styles.comment}>
      <DisqusComment.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}

Disqus.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
