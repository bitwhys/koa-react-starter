import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { routes } from 'routes';

import * as userActions from 'resources/user/user.actions';

import AuthLayout from 'layouts/auth';

import Input from 'components/input';
import Button from 'components/button';

import styles from './sign-up.pcss';

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [pending, setPending] = React.useState(false);
  const [errors, setErrors] = React.useState({}); 

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function signUp(event) {
    event.preventDefault();

    try {
      setPending(true);
      await dispatch(userActions.signUp({
        firstName,
        lastName,
        email,
        password,
      }));
      history.push(routes.home.path);
    } catch (error) {
      setErrors(error.data.errors);
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={signUp}
        noValidate
        className={styles.container}
      >
        <h1 className={styles.title}>
          Sign Up
        </h1>
        <div className={styles.row}>
          <Input
            type="text"
            value={firstName}
            onChange={setFirstName}
            errors={errors.firstName}
            placeholder="First Name"
            disabled={pending}
          />
        </div>
        <div className={styles.row}>
          <Input
            type="text"
            value={lastName}
            onChange={setLastName}
            errors={errors.lastName}
            placeholder="Last Name"
            disabled={pending}
          />
        </div>
        <div className={styles.row}>
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            errors={errors.email}
            placeholder="Email"
            disabled={pending}
          />
        </div>
        <div className={styles.row}>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            errors={errors.password}
            placeholder="Password"
            disabled={pending}
          />
        </div>
        <div className={styles.row}>
          <Button
            type="submit"
            color="green"
            disabled={pending || !firstName || !lastName || !email || !password}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default React.memo(SignUp);
