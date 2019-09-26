import React from 'react';

import Input from 'Components/atoms/InputFields';
import Button from 'Components/atoms/Button';
import Header from 'Components/compounds/Header';
import Styles from './login.styles.scss';

export default function Login() {
  return (
    <div>
      <Header />
      <div className={Styles.formContainer}>
        <form className={Styles.loginForm}>
          <h1 className={Styles.header}>Login Form</h1>
          <Input name="username" type="text" label="Username:" addedWrapperStyle={Styles.input} />
          <Input name="password" type="password" label="Password:" addedWrapperStyle={Styles.input} />
          <Button text="submit" style={Styles.btn} />
        </form>
      </div>
    </div>
  );
}
