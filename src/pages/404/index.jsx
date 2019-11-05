import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'Components/compounds/Header';
import Articles from 'Components/compounds/Articles';

import Styles from './404.styles.scss';

function notFound(props) {
  const { history: { location: { state } } } = props;

  if (state) {
    return (
      <div>
        <Header />
        {state.error === 404 && <h1 className={Styles.errorTitle}>404</h1>}
        <p className={Styles.errorMessage}>{state.errorMessage}</p>
        <Articles noHeading />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h1 className={Styles.errorTitle}>404</h1>
      <p className={Styles.errorMessage}>Page not found. But here are some fire articles</p>
      <Articles noHeading />
    </div>
  );
}

notFound.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        error: PropTypes.number,
        errorMessage: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}.isRequired;

export default withRouter(notFound);
